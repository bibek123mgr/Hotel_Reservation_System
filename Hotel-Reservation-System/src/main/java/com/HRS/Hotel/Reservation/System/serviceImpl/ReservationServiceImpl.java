package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.*;
import com.HRS.Hotel.Reservation.System.POJO.*;
import com.HRS.Hotel.Reservation.System.config.MailService;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.enums.*;
import com.HRS.Hotel.Reservation.System.paymentService.KhaltiPaymentService;
import com.HRS.Hotel.Reservation.System.restImpl.ReservationRestImpl;
import com.HRS.Hotel.Reservation.System.service.ReservationService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.KhaltiPaymentVerifyRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ReservationServiceImpl implements ReservationService {
    private static final Logger logger= LoggerFactory.getLogger(ReservationServiceImpl.class);

    @Autowired
    private ReservationDao reservationDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private RoomDao roomDao;

    @Autowired
    private HotelDao hotelDao;

    @Autowired
    private PaymentDao paymentDao;

    @Autowired
    private HotelWalletDao hotelWalletDao;

    @Autowired
    private HotelRoomCategoryDao roomCategoryDao;

    @Autowired
    private KhaltiPaymentService khaltiPaymentService;

    @Autowired
    private MailService mailService;

    @Override
    public ResponseEntity<String> createReservation(ReservationRequestWrapper reservationRequestWrapper) {
        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            Optional<Room> roomOpt = findAvailableRoomForDateRange(
                    reservationRequestWrapper.getRoomCategoryId(),
                    reservationRequestWrapper.getHotelId(),
                    reservationRequestWrapper.getCheckInDate(),
                    reservationRequestWrapper.getCheckOutDate()
            );

            if (roomOpt.isEmpty()) {
                return HotelUtils.getResponse("No available room found", HttpStatus.NOT_FOUND);
            }

            Room room = roomOpt.get();
            Double price = room.getPrice();

            String orderId = UUID.randomUUID().toString();
            String orderName = "Hotel Reservation";
            String name = String.valueOf(reservationRequestWrapper.getCreatedBy())
                    + String.valueOf(reservationRequestWrapper.getCheckInDate())
                    + String.valueOf(reservationRequestWrapper.getCheckOutDate());
            String email = userPrincipal.getUsername();

            Payment payment;
            Integer paymentId;

            if (reservationRequestWrapper.getPaymentMethod() == PaymentMethod.KHALTI) {
                String paymentResponse = khaltiPaymentService.initiateKhaltiPayment(
                        price,
                        orderId,
                        orderName,
                        name,
                        email
                );

                ObjectMapper mapper = new ObjectMapper();
                JsonNode jsonResponse = mapper.readTree(paymentResponse);

                if (jsonResponse.has("payment_url") && jsonResponse.has("pidx")) {
                    String pidx = jsonResponse.get("pidx").asText();
                    String paymentUrl = jsonResponse.get("payment_url").asText();

                    payment = mapPaymentData(reservationRequestWrapper, pidx);
                    payment.setPaymentStatus(PaymentStatus.PENDING);
                    paymentId = paymentDao.save(payment).getId();

                    Reservation reservation = buildReservationFromRequest(
                            reservationRequestWrapper,
                            paymentId,
                            ReservationStatus.PENDING,
                            price
                    );
                    reservationDao.save(reservation);

                    room.setRoomStatus(RoomStatus.PND_CFM);
                    roomDao.save(room);

                    String responseJson = String.format("{\"message\":\"Hotel Reserved!!\", \"payment_url\":\"%s\"}", paymentUrl);
                    return new ResponseEntity<>(responseJson, HttpStatus.CREATED);
                } else {
                    return HotelUtils.getResponse("Payment failed !!", HttpStatus.BAD_REQUEST);
                }
            } else if (reservationRequestWrapper.getPaymentMethod() == PaymentMethod.CASH) {
                String pidx = UUID.randomUUID().toString();

                payment = mapPaymentData(reservationRequestWrapper, pidx);
                payment.setPaymentStatus(PaymentStatus.PENDING);
                paymentId = paymentDao.save(payment).getId();

                Optional<Hotel> hotelOpt = hotelDao.findById(reservationRequestWrapper.getHotelId());
                Optional<RoomCategory> roomCategoryOpt = roomCategoryDao.findById(reservationRequestWrapper.getRoomCategoryId());
                User user = userDao.findByEmailId(userPrincipal.getUsername());

                LocalDateTime checkInDate = reservationRequestWrapper.getCheckInDate();
                LocalDateTime checkOutDate = reservationRequestWrapper.getCheckOutDate();
                Integer guest = reservationRequestWrapper.getNumberOfGuests();

                Reservation reservation = buildReservationFromRequest(
                        reservationRequestWrapper,
                        paymentId,
                        ReservationStatus.CONFIRMED,
                        price
                );
                reservationDao.save(reservation);

                room.setRoomStatus(RoomStatus.OCCUPIED);
                roomDao.save(room);

                mailUserAboutReservation(
                        user,
                        hotelOpt.get(),
                        roomCategoryOpt.get(),
                        room,
                        checkInDate,
                        checkOutDate,
                        guest,
                        price,
                        PaymentMethod.CASH,
                        PaymentStatus.PENDING
                );

                return HotelUtils.getResponse("Reservation created successfully with CASH payment", HttpStatus.CREATED);
            } else {
                return HotelUtils.getResponse("Invalid payment method", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    private void mailUserAboutReservation(
            User user,
            Hotel hotel,
            RoomCategory roomCategory,
            Room room,
            LocalDateTime checkInDate,
            LocalDateTime checkOutDate,
            Integer numberOfGuests,
            Double price,
            PaymentMethod paymentMethod,
            PaymentStatus paymentStatus
    ) {
        String subject = "Hotel Reservation Confirmation";
        String body = "Dear " + user.getFirstName() + ",\n\n"
                + "Thank you for your reservation at *" + hotel.getHotelName() + "*.\n\n"
                + "Here are your reservation details:\n"
                + "----------------------------------------\n"
                + "Hotel Name     : " + hotel.getHotelName() + "\n"
                + "Room Category  : " + roomCategory.getRoomCategoryType() + "\n"
                + "Room Number    : " + room.getRoomNumber() + "\n"
                + "Check-in Date  : " + checkInDate.toLocalDate() + "\n"
                + "Check-out Date : " + checkOutDate.toLocalDate() + "\n"
                + "No. of Guests  : " + numberOfGuests + "\n"
                + "Total Amount   : Rs. " + price + "\n"
                + "Payment Method : " + paymentMethod.name() + "\n"
                + "Payment Status : " + paymentStatus.name() + "\n"
                + "----------------------------------------\n\n"
                + "We look forward to hosting you.\n\n"
                + "Best regards,\n"
                + "Hotel Reservation System Team";

        mailService.sendMail(user.getEmail(), subject, body);
    }

    private Payment mapPaymentData(ReservationRequestWrapper reservationRequestWrapper,String pidx) {
        Payment payment = new Payment();

        Hotel hotel = new Hotel();
        hotel.setId(reservationRequestWrapper.getHotelId());

        Room room = new Room();
        room.setId(reservationRequestWrapper.getRoomId());

        User createdBy = new User();
        createdBy.setId(reservationRequestWrapper.getCreatedBy());

        payment.setTransactionId(pidx);
        payment.setAmount(reservationRequestWrapper.getPrice());
        payment.setPaymentMethod(reservationRequestWrapper.getPaymentMethod());
        payment.setPaymentStatus(PaymentStatus.PENDING);
        payment.setHotel(hotel);
        payment.setRoom(room);
        payment.setCreatedBy(createdBy);

        return payment;
    }

    private Optional<Room> findAvailableRoomForDateRange(
            Integer categoryId,
            Integer hotelId,
            LocalDateTime checkInDate,
            LocalDateTime checkOutDate) {

        List<Room> candidateRooms = roomDao.findByStatusAndRoomStatusAndRoomCategoryIdAndHotelId(
                true, RoomStatus.AVAILABLE, categoryId, hotelId);
        System.out.println("rooms"+candidateRooms);
        System.out.println(RoomStatus.AVAILABLE);
        System.out.println(categoryId);
        System.out.println( hotelId);


        for (Room room : candidateRooms) {
            boolean isReserved = reservationDao.existsActiveReservationBetweenDates(
                    room.getId(), checkInDate, checkOutDate,List.of(ReservationStatus.PENDING, ReservationStatus.CHECKED_IN, ReservationStatus.CONFIRMED));
            System.out.println("rooms"+isReserved);

            if (!isReserved) {
                return Optional.of(room);
            }
        }

        return Optional.empty();
    }


    @Override
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservation() {
        try{
            List<ReservationResponseWrapper> reservation=reservationDao.getAllReservation();
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);    }


    @Override
    public ResponseEntity<List<ReservationResponseWrapper>> getAllUserReservation(Integer userId) {
        try{
            List<ReservationResponseWrapper> reservation=reservationDao.getAllUserReservation(userId);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> updateReservationStatus(Integer id, ReservationStatus status) {
        try {
            Optional<Reservation> optionalReservation = reservationDao.findById(id);

            if (!optionalReservation.isPresent()) {
                return HotelUtils.getResponse("Reservation not found", HttpStatus.NOT_FOUND);
            }

            Reservation reservation = optionalReservation.get();
            Room room = reservation.getRoom();

            if (status == ReservationStatus.CHECKED_OUT || status == ReservationStatus.CANCELLED) {
                room.setRoomStatus(RoomStatus.AVAILABLE);
            } else {
                room.setRoomStatus(RoomStatus.OCCUPIED);
            }

            roomDao.save(room);
            reservation.setReservationStatus(status);
            reservationDao.save(reservation);

            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public ResponseEntity<String> verifyReservationKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            String pidx = khaltiPaymentVerifyRequestWrapper.getPidx();
            String khaltiResponse = khaltiPaymentService.verifyKhaltiPayment(pidx);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonResponse = mapper.readTree(khaltiResponse);

            if (jsonResponse.has("status")) {
                String status = jsonResponse.get("status").asText();

                Payment payment = paymentDao.findByKhaltiPidx(pidx);
                if (payment == null) {
                    return HotelUtils.getResponse("Invalid Payment PIDX", HttpStatus.OK);
                } else {
                    if ("Completed".equalsIgnoreCase(status)) {
                        payment.setPaymentStatus(PaymentStatus.SUCCESS);
                        paymentDao.save(payment);

                        Optional<Room> roomOptional = roomDao.findById(payment.getRoom().getId());
                        if (roomOptional.isPresent()) {
                            Room room = roomOptional.get();
                            room.setRoomStatus(RoomStatus.OCCUPIED);
                            roomDao.save(room);
                        } else {
                            throw new RuntimeException("Room not found with id: " + payment.getRoom().getId());
                        }

                        Integer paymentId=payment.getId();
                        Reservation reservation = reservationDao.findReservationByPaymentId(paymentId);
                        reservation.setReservationStatus(ReservationStatus.CONFIRMED);
                        reservationDao.save(reservation);


                        Optional<Hotel> hotel=hotelDao.findById(reservation.getHotel().getId());
                        Optional<RoomCategory> roomCategory=roomCategoryDao.findById(reservation.getRoomCategory().getId());
                        Optional<Room> room=roomDao.findById(reservation.getRoom().getId());

                        User user= userDao.findByEmailId(userPrincipal.getUsername());

                        LocalDateTime checkInDate=reservation.getCheckInDate();
                        LocalDateTime checkOutDate=reservation.getCheckOutDate();
                        Integer guest=reservation.getNumberOfGuests();
                        Double price= reservation.getPrice();

                        mailUserAboutReservation(user,hotel.get(),roomCategory.get(),room.get(),checkInDate,checkOutDate,guest,price,PaymentMethod.KHALTI,PaymentStatus.SUCCESS);

                        return HotelUtils.getResponse("Payment Verified Successfully!", HttpStatus.OK);
                    } else {
                        payment.setPaymentStatus(PaymentStatus.FAILED);
                        paymentDao.save(payment);
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
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservationHotel() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            Integer hotelId= userPrincipal.getHotelId();
            if(hotelId != null) {
                List<ReservationResponseWrapper> reservation = reservationDao.getAllReservationHotel(hotelId);
                return new ResponseEntity<>(reservation, HttpStatus.OK);
            }else{
                List<ReservationResponseWrapper> reservation = reservationDao.getAllReservation();
                return new ResponseEntity<>(reservation, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ReservationResponseWrapper> getReservation(Integer id) {
        try{
                ReservationResponseWrapper reservation = reservationDao.getReservation(id);
                return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ReservationResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);    }

    private Reservation buildReservationFromRequest(ReservationRequestWrapper wrapper,Integer paymentId,ReservationStatus reservationStatus,Double price) {
        Reservation reservation = new Reservation();

        Hotel hotel = new Hotel();
        hotel.setId(wrapper.getHotelId());

        Payment payment=new Payment();
        payment.setId(paymentId);

        RoomCategory roomCategory = new RoomCategory();
        roomCategory.setId(wrapper.getRoomCategoryId());

        Room room = new Room();
        room.setId(wrapper.getRoomId());

        User bookedBy = new User();
        bookedBy.setId(wrapper.getBookedBy());

        User createdBy = new User();
        createdBy.setId(wrapper.getCreatedBy());

        reservation.setHotel(hotel);
        reservation.setPayment(payment);
        reservation.setRoomCategory(roomCategory);
        reservation.setRoom(room);
        reservation.setBookedBy(bookedBy);
        reservation.setCreatedBy(createdBy);
        reservation.setReservationStatus(reservationStatus);
        reservation.setPrice(price);
        reservation.setCheckInDate(wrapper.getCheckInDate());
        reservation.setCheckOutDate(wrapper.getCheckOutDate());
        reservation.setNumberOfGuests(wrapper.getNumberOfGuests());
        reservation.setStatus(true);

        // Remove manual timestamp setting - let auditing handle it
        return reservation;
    }



}
