package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.*;
import com.HRS.Hotel.Reservation.System.JWT.JwtService;
import com.HRS.Hotel.Reservation.System.POJO.*;
import com.HRS.Hotel.Reservation.System.config.MailService;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.enums.PaymentMethod;
import com.HRS.Hotel.Reservation.System.enums.PaymentStatus;
import com.HRS.Hotel.Reservation.System.paymentService.KhaltiPaymentService;
import com.HRS.Hotel.Reservation.System.rest.MediaFileRest;
import com.HRS.Hotel.Reservation.System.service.HotelService;
import com.HRS.Hotel.Reservation.System.service.MediaFileService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@Service
@Transactional
public class HotelServiceImpl implements HotelService {

    private static final Logger logger = LoggerFactory.getLogger(HotelServiceImpl.class);

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private UserDao userDao;

    @Autowired
    private HotelDao hotelDao;

    @Autowired
    private HotelHighInfoDetailDao hotelHighInfoDetailDao;


    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private KhaltiPaymentService khaltiPaymentService;

    @Autowired
    private SubscriptionPlanPayment subscriptionPlanPayment;

    @Autowired
    private SubscriptionPlanDao subscriptionPlanDao;

    @Autowired
    private RoomDao roomDao;

    @Autowired
    private ReservationDao reservationDao;


    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtService jwtService;

    @Value("${file.upload.directory:uploads/}")
    private String uploadDir;

    @Autowired
    private MailService mailService;

    @Autowired
    private MediaFileDao mediaFileDao;
    @Override
    public ResponseEntity<String> addHotel(HotelCreateRequestWrapper hotelCreateRequestWrapper , MultipartFile imageFile) {
        try {
            if (!validateHotelRegistrationMap(hotelCreateRequestWrapper)) {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }else {
                Optional<SubscriptionPlan> optionalPlan = subscriptionPlanDao.findById(hotelCreateRequestWrapper.getSubscriptionId());
                if (optionalPlan.isEmpty()) {
                    return HotelUtils.getResponse("Invalid subscription plan ID", HttpStatus.BAD_REQUEST);
                } else{
                    Double amount=0.00;
                    String orderId = UUID.randomUUID().toString();
                    String orderName = "Hotel Subscription";
                    String name = hotelCreateRequestWrapper.getFirstName() + hotelCreateRequestWrapper.getLastName() + hotelCreateRequestWrapper.getHotelName();
                    String email = hotelCreateRequestWrapper.getEmail();
                    Integer subscriptionDuration=hotelCreateRequestWrapper.getSubscriptionDuration();
                    String subscriptionType=hotelCreateRequestWrapper.getSubscriptionType();
                    Integer subscriptionPlanId = hotelCreateRequestWrapper.getSubscriptionId();
                    if(subscriptionType=="monthly"){
                        amount = optionalPlan.get().getMonthlyPrice() * subscriptionDuration;
                    }else{
                        amount = optionalPlan.get().getMonthlyPrice() * subscriptionDuration;
                    }
                    String paymentResponse = khaltiPaymentService.initiateSubKhaltiPayment(amount, orderId, orderName, name, email);
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode jsonResponse = mapper.readTree(paymentResponse);
                    if (jsonResponse.has("payment_url") && jsonResponse.has("pidx")) {
                        String pidx = jsonResponse.get("pidx").asText();
                        String paymentUrl = jsonResponse.get("payment_url").asText();

                        User user = userDao.save(getUserFromHotelRegisterMap(hotelCreateRequestWrapper));

                        String filename= saveFileToDisk(imageFile);
                        Hotel hotel = getHotelFromMap(hotelCreateRequestWrapper, user.getId(),filename);
                        hotelDao.save(hotel);
                        subscriptionPlanPayment.save(
                                mapDataInSubscriptionPayment(hotel.getId(), subscriptionPlanId, amount, PaymentMethod.KHALTI, pidx,subscriptionDuration, subscriptionType)
                        );
                        sendHotelWelcomeEmail(user,hotel);

                        String responseJson = String.format("{\"message\":\"Hotel Registered!!\", \"payment_url\":\"%s\"}", paymentUrl);
                        return new ResponseEntity<>(responseJson, HttpStatus.CREATED);

                } else {
                    return HotelUtils.getResponse("Payment failed !!", HttpStatus.BAD_REQUEST);
                }
            }
            }
        } catch (Exception e) {
            logger.error("Error occurred in HotelServiceImpl: {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private void sendHotelWelcomeEmail(User user, Hotel hotel) {
        String adminPanelUrl = "https://yourdomain.com/admin/login";

        String subject = "Welcome to Hotel Reservation System - Your Hotel is Now Registered!";
        String body = "Dear " + user.getFirstName() + " " + user.getLastName() + ",\n\n"
                + "Congratulations on successfully registering your hotel, " + hotel.getHotelName() + ", with our system!\n\n"
                + "Here are your hotel details:\n"
                + "----------------------------------------\n"
                + "Hotel Name: " + hotel.getHotelName() + "\n"
                + "Address: " + hotel.getAddress() + "\n"
                + "City: " + hotel.getCity() + "\n"
                + "State: " + hotel.getState() + "\n"
                + "Zip Code: " + hotel.getZipCode() + "\n"
                + "Check-in Time: " + hotel.getCheckInTime() + "\n"
                + "Check-out Time: " + hotel.getCheckOutTime() + "\n"
                + "Hotel Code: " + hotel.getHotelCode() + "\n"
                + "----------------------------------------\n\n"
                + "You can now access your hotel admin panel using the following credentials:\n"
                + "Email: " + user.getEmail() + "\n"
                + "Hotel Code: " + hotel.getHotelCode() + "\n\n"
                + "Access your admin panel here: " + adminPanelUrl + "\n\n"
                + "In your admin panel, you can:\n"
                + "- Manage room inventory\n"
                + "- View and confirm reservations\n"
                + "- Update hotel information\n"
                + "- Monitor your hotel's performance\n\n"
                + "If you have any questions or need assistance, please don't hesitate to contact our support team.\n\n"
                + "Thank you for choosing our platform. We're excited to have you with us!\n\n"
                + "Best regards,\n"
                + "Hotel Reservation System Team\n"
                + "Support: support@yourdomain.com\n"
                + "Phone: +1 (555) 123-4567";

        mailService.sendMail(user.getEmail(), subject, body);
    }

    private String saveFileToDisk(MultipartFile file) throws Exception {
        try {
            String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String fileType = originalFileName.contains(".")
                    ? originalFileName.substring(originalFileName.lastIndexOf("."))
                    : "";
            String timeStamp = String.valueOf(System.currentTimeMillis());
            String fileName = timeStamp + "-" + originalFileName;

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return "/uploads/" + fileName;

        } catch (IOException e) {
            logger.error("File operation failed", e);
            throw new Exception("File operation failed", e);
        }
    }

    @Override
    public ResponseEntity<Hotel> getHotelProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer hotelId = userPrincipal.getHotelId();
            System.out.println(hotelId);

            Optional<Hotel> hotel = hotelDao.findById(hotelId);
            System.out.println(hotelId);
            if (hotel.isPresent()) {
                return new ResponseEntity<>(hotel.get(), HttpStatus.OK);
            } else {
                logger.warn("Hotel not found for hotelId: {}", hotelId);
                return new ResponseEntity<>(new Hotel(),HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            logger.error("Error occurred in getHotelProfile: {}", e.getMessage(), e);
            return new ResponseEntity<>(new Hotel(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<DashboardSummeryResponseWrapper> getDashboardSummery() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer hotelId = userPrincipal.getHotelId();

            Integer reservationCount;
            Integer roomCount;
            Integer checkInCount;
            Integer checkOutCount;

            if (hotelId != null) {
                reservationCount = reservationDao.getReservationCountOfHotel(hotelId);
                roomCount = roomDao.getCountRoomOfHotel(hotelId);
                checkInCount = reservationDao.countTodaysCheckInsByHotel(hotelId);
                checkOutCount = reservationDao.countTodaysCheckOutsByHotel(hotelId);
            } else {
                reservationCount = reservationDao.getReservationCount();
                roomCount = roomDao.getCountRoom();
                checkInCount = reservationDao.countTodaysCheckIns();
                checkOutCount = reservationDao.countTodaysCheckOuts();
            }

            reservationCount = reservationCount == null ? 0 : reservationCount;
            roomCount = roomCount == null ? 0 : roomCount;
            checkInCount = checkInCount == null ? 0 : checkInCount;
            checkOutCount = checkOutCount == null ? 0 : checkOutCount;

            int occupancyRate = 0;
            if (roomCount > 0) {
                occupancyRate = (int) Math.round((checkInCount * 100.0) / roomCount);
            }

            DashboardSummeryResponseWrapper response = new DashboardSummeryResponseWrapper(
                    checkInCount,
                    checkOutCount,
                    reservationCount,
                    occupancyRate
            );

            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error occurred in getDashboardSummery: {}", e.getMessage(), e);
            return new ResponseEntity<>(new DashboardSummeryResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<PaymentSummeryResponse> getPaymentSummery() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer hotelId = userPrincipal.getHotelId();

            PaymentSummeryResponse payments;

            if(hotelId != null){
                payments=paymentDao.getHotelPaymentSummaryByHotelId(hotelId);

            }else{
                payments=paymentDao.getAllHotelPaymentSummery();

            }
            return new ResponseEntity<>(payments, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error occurred in getDashboardSummery: {}", e.getMessage(), e);
            return new ResponseEntity<>(new PaymentSummeryResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateHotelProfile(HotelUpdateRequestWrapper hotelUpdateRequestWrapper) {
        try {
            Optional<Hotel> optionalHotel = hotelDao.findById(hotelUpdateRequestWrapper.getId());

            if (optionalHotel.isEmpty()) {
                return HotelUtils.getResponse("Hotel not found", HttpStatus.NOT_FOUND);
            }
            System.out.println("hotel request body"+hotelUpdateRequestWrapper);
            Hotel hotel = optionalHotel.get();
            System.out.println("hotel "+hotel);

            hotel.setAddress(hotelUpdateRequestWrapper.getAddress());
            hotel.setCheckInTime(hotelUpdateRequestWrapper.getCheckInTime());
            hotel.setCheckOutTime(hotelUpdateRequestWrapper.getCheckOutTime());
            hotel.setCity(hotelUpdateRequestWrapper.getCity());
            hotel.setDescription(hotelUpdateRequestWrapper.getDescription());
            hotel.setGoogleMapLink(hotelUpdateRequestWrapper.getGoogleMapLink());
            hotel.setHotelName(hotelUpdateRequestWrapper.getHotelName());
            hotel.setLatitude(hotelUpdateRequestWrapper.getLatitude());
            hotel.setLongitude(hotelUpdateRequestWrapper.getLongitude());
            hotel.setState(hotelUpdateRequestWrapper.getState());
            hotel.setZipCode(hotelUpdateRequestWrapper.getZipCode());

            hotelDao.save(hotel);

            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error occurred in updateHotelProfile: {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<String> updateHotelProfileImage(MultipartFile imageFile,Integer id) {
        try {
            Optional<Hotel> optionalHotel = hotelDao.findById(id);

            if (optionalHotel.isEmpty()) {
                return HotelUtils.getResponse("Hotel not found", HttpStatus.NOT_FOUND);
            }
            Hotel hotel = optionalHotel.get();
            String filename= saveFileToDisk(imageFile);
            hotel.setImageUrl(filename);
            hotelDao.save(hotel);

            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);

        } catch (Exception e) {
            logger.error("Error occurred in updateHotelProfile: {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private SubscriptionPayment mapDataInSubscriptionPayment(Integer hotelId,Integer subscriptionPlanId,Double amount,PaymentMethod paymentMethod,String transcationId,Integer subscriptionDuration,String subscriptionType){
        SubscriptionPayment payment=new SubscriptionPayment();
        SubscriptionPlan subscriptionPlan=new SubscriptionPlan();
        subscriptionPlan.setId(subscriptionPlanId);
        Hotel hotel=new Hotel();
        hotel.setId(hotelId);
        payment.setStatus(true);
        payment.setPaymentStatus("PENDING");
        payment.setAmount(amount);
        payment.setSubscriptionDuration(subscriptionDuration);
        payment.setSubscriptionType(subscriptionType);
        payment.setTransactionId(transcationId);
        payment.setSubscriptionPlan(subscriptionPlan);
        payment.setPaymentMethod(paymentMethod);
        payment.setHotel(hotel);
        return payment;
    }

    private MediaFile saveMediaFile(MultipartFile file, Map<String, String> metaData) throws Exception {
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileType = originalFileName.contains(".") ? originalFileName.substring(originalFileName.lastIndexOf(".")) : "";
        String timeStamp = String.valueOf(System.currentTimeMillis());
        String fileName = timeStamp + "-" + originalFileName;

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        MediaFile mediaFile = new MediaFile();
        mediaFile.setMediaUrl("/uploads/" + fileName);
        mediaFile.setMediaType(fileType);
        mediaFile.setOwnerType(metaData.get("ownerType"));
        mediaFile.setCreatedAt(LocalDateTime.now());
        mediaFile.setUpdatedAt(LocalDateTime.now());
        return mediaFileDao.save(mediaFile);
    }

    @Override
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableHotels(Map<String, String> queryParams) {
        try{
            Map<String, Object> response = new HashMap<>();
            response.put("message","Data Fetch Successfully");
            List<HotelListWrapper> allFilterHotelMap=hotelDao.findAvailableHotelsWithFilters();
            return new ResponseEntity<>(allFilterHotelMap, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("error occurred at HotelServiceImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableNearByHotels(HotelNearByRequestWrapper requestQuery) {
        try{
            List<HotelListWrapper> allFilterHotelMap=hotelDao.findAvailableHotelsNearByWithFilters(
                    requestQuery.getLatitude(),
                    requestQuery.getLongitude(),
                    requestQuery.getRadius());
            return new ResponseEntity<>(allFilterHotelMap, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("error occurred at HotelServiceImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> verifySubscriptionKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper) {
        try {
            String pidx = khaltiPaymentVerifyRequestWrapper.getPidx();
            String khaltiResponse = khaltiPaymentService.verifyKhaltiPayment(pidx);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonResponse = mapper.readTree(khaltiResponse);

            if (jsonResponse.has("status")) {
                String status = jsonResponse.get("status").asText();

                SubscriptionPayment payment = subscriptionPlanPayment.findByKhaltiPidx(pidx);
                if (payment == null) {
                    return HotelUtils.getResponse("Invalid Payment PIDX", HttpStatus.OK);
                } else {
                    payment.setPaymentStatus(status);
                    subscriptionPlanPayment.save(payment);
                    if ("Completed".equalsIgnoreCase(status)) {
                        return HotelUtils.getResponse("Payment Verified Successfully!", HttpStatus.OK);
                    } else {
                        return HotelUtils.getResponse("Payment Verification Failed!", HttpStatus.OK);
                    }
                }
            } else {
                return HotelUtils.getResponse("Payment response missing status!", HttpStatus.OK);
            }

        } catch (Exception e) {
            logger.error("Error occurred while verifying Khalti payment: {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> signIn(HotelSignInRequestWrapper hotelSignInRequestWrapper, HttpServletResponse response) {
        try{
            if(validateSignInMap(hotelSignInRequestWrapper)){
                Authentication auth=authManager.authenticate(new UsernamePasswordAuthenticationToken(hotelSignInRequestWrapper.getEmail(),hotelSignInRequestWrapper.getPassword()));
                if(auth.isAuthenticated()){
                    UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
                    boolean isHotelAdmin = userPrincipal.isHotelAdmin();
                    if(isHotelAdmin) {
                       Hotel hotel= hotelDao.findByUserId(userPrincipal.getId(),hotelSignInRequestWrapper.getHotelCode());
                       if(hotel != null) {
                           String username = userPrincipal.getUsername();
                           String token = jwtService.generateToken(username, "hotel_admin");
                           String refreshToken = jwtService.generateRefreshToken(username, "hotel_admin");
                           Cookie cookie = new Cookie("refresh-token", refreshToken);
                           cookie.setHttpOnly(true);
                           cookie.setSecure(true);
                           cookie.setPath("/");
                           cookie.setMaxAge(7 * 24 * 60 * 60);
                           cookie.setDomain("localhost");
                           response.addCookie(cookie);
                           return new ResponseEntity<String>("{\"message\":\"Successfully Login.\",\"access-token\":\"" + token + "\"}", HttpStatus.OK);
                       }else{
                           return HotelUtils.getResponse("Invalid Credentials.",HttpStatus.BAD_REQUEST);
                    }
                    }
                }else{
                    return HotelUtils.getResponse("Invalid Credentials.",HttpStatus.BAD_REQUEST);}
            }else {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<GetAllActiveHotelsWrapper>> getAllAvailableHotelsForLoginPage() {
        try{
            List<GetAllActiveHotelsWrapper> activeHotels=hotelDao.findAllActiveHotel();
            return new ResponseEntity<>(activeHotels, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);

    }

    private Boolean validateSignInMap(HotelSignInRequestWrapper hotelSignInRequestWrapper){
        return  hotelSignInRequestWrapper.getHotelCode() != null &&
                hotelSignInRequestWrapper.getEmail() != null &&
                hotelSignInRequestWrapper.getPassword() != null;
    }


    private boolean validateHotelRegistrationMap(HotelCreateRequestWrapper request) {
        return request.getFirstName() != null &&
                request.getLastName() != null &&
                request.getEmail() != null &&
                request.getPassword() != null &&
                request.getRole() != null &&
                request.getSubscriptionId() != null &&
                request.getSubscriptionDuration() != null &&
                request.getSubscriptionType() != null &&
                request.getHotelName() != null &&
                request.getDescription() != null &&
                request.getAddress() != null &&
                request.getCity() != null &&
                request.getState() != null &&
                request.getZipCode() != null &&
                request.getCheckInTime() != null &&
                request.getCheckOutTime() != null;
    }


    private Hotel getHotelFromMap(HotelCreateRequestWrapper request, Integer ownerId,String imageUrl) {
        Hotel hotel = new Hotel();
        hotel.setHotelName(request.getHotelName());
        hotel.setHotelCode(generateHotelCode());
        hotel.setOwnerId(ownerId);
        hotel.setDescription(request.getDescription());
        hotel.setAddress(request.getAddress());
        hotel.setCity(request.getCity());
        hotel.setState(request.getState());
        hotel.setZipCode(request.getZipCode());
        hotel.setGoogleMapLink(request.getGoogleMapLink());
        hotel.setLongitude(request.getLongitude());
        hotel.setLatitude(request.getLatitude());
        hotel.setCheckInTime(request.getCheckInTime());
        hotel.setImageUrl(imageUrl);
        hotel.setCheckOutTime(request.getCheckOutTime());
        hotel.setStatus(true);
        return hotel;
    }


    private com.HRS.Hotel.Reservation.System.POJO.User getUserFromHotelRegisterMap(HotelCreateRequestWrapper hotelCreateRequestWrapper){
        com.HRS.Hotel.Reservation.System.POJO.User user=new User();
        user.setFirstName(hotelCreateRequestWrapper.getFirstName());
        user.setLastName(hotelCreateRequestWrapper.getLastName());
        user.setEmail(hotelCreateRequestWrapper.getEmail());
        user.setPassword(encoder.encode(hotelCreateRequestWrapper.getPassword()));
        user.setRole(hotelCreateRequestWrapper.getRole());
        return user;
    }


    private Integer generateHotelCode() {
        Random random = new Random();
        return 100000 + random.nextInt(9000000);
    }
}
