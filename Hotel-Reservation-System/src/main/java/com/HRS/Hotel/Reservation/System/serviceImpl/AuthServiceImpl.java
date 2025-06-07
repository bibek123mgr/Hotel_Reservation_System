package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.OtpVerificationDao;
import com.HRS.Hotel.Reservation.System.DAO.ReservationDao;
import com.HRS.Hotel.Reservation.System.DAO.UserDao;
import com.HRS.Hotel.Reservation.System.JWT.JwtService;
import com.HRS.Hotel.Reservation.System.POJO.OtpVerification;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
import com.HRS.Hotel.Reservation.System.config.CookieService;
import com.HRS.Hotel.Reservation.System.config.CostumUserDetailsService;
import com.HRS.Hotel.Reservation.System.config.MailService;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.AuthService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.ForgotRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UpdateAuthPasswordWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Transactional
@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CookieService cookieService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CostumUserDetailsService costumUserDetailsService;

    @Autowired
    private MailService mailService;

    @Autowired
    private OtpVerificationDao otpVerificationDao;

    @Autowired
    private ReservationDao reservationDao;

    private static final Logger logger= LoggerFactory.getLogger(AuthServiceImpl.class);
    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            if(validateSignUpMap(requestMap)){
                User user=userDao.findByEmailId(requestMap.get("email"));
                if(Objects.isNull(user)){
                    userDao.save(getUserFromMap(requestMap));
                    return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.CREATED);
                }else{
                    return HotelUtils.getResponse("Email Address Already Exist", HttpStatus.BAD_REQUEST);
                }
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Boolean validateSignUpMap(Map<String,String> requestMap) {
        return requestMap.containsKey("email")
                && requestMap.containsKey("password")
                && requestMap.containsKey("firstName")
                && requestMap.containsKey("lastName");
    }

    private com.HRS.Hotel.Reservation.System.POJO.User getUserFromMap(Map<String,String> requestMap){
        com.HRS.Hotel.Reservation.System.POJO.User user=new User();
        user.setFirstName(requestMap.get("firstName"));
        user.setLastName(requestMap.get("lastName"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(encoder.encode(requestMap.get("password")));
        user.setRole("user");
        return user;
    }

    @Override
    public ResponseEntity<String> signIn(Map<String, String> requestMap,HttpServletResponse response) {
        try{
            if(validateSignInMap(requestMap)){
                Authentication auth=authManager.authenticate(new UsernamePasswordAuthenticationToken(requestMap.get("email"),requestMap.get("password")));
                if(auth.isAuthenticated()){
                    UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
                    String username = userPrincipal.getUsername();
                    String role = userPrincipal.getAuthorities().iterator().next().getAuthority();
                    String token=jwtService.generateToken(username,"user");
                    String refreshToken= jwtService.generateRefreshToken(username,"user");

                    Cookie cookie = new Cookie("refresh-token", refreshToken);
                    cookie.setHttpOnly(true);
                    cookie.setSecure(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    cookie.setDomain("localhost");

                    response.addCookie(cookie);
                    return new ResponseEntity<String>("{\"message\":\"Successfully Login.\",\"access-token\":\"" + token + "\"}", HttpStatus.OK);
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

    private boolean validateSignInMap(Map<String,String> requestMap){
        return requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    @Override
    public ResponseEntity<String> forgetPassword(ForgotRequestWrapper forgotRequestWrapper) {
        try {
            String email=forgotRequestWrapper.getEmail();
            User user = userDao.findByEmailId(email);
            if (Objects.isNull(user)) {
                return HotelUtils.getResponse(HotelConstant.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
            } else {
                Random ran = new Random();
                int otp = ran.nextInt(900000) + 100000;
                String subject = "Forget Password Change";
                String body = "Dear " + user.getFirstName() + ",\n\n"
                        + "We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed with changing your password:\n\n"
                        + "OTP: " + otp + "\n\n"
                        + "For security reasons, this OTP is valid for only a short period and should not be shared with anyone.\n\n"
                        + "If you did not request a password reset, please ignore this email.\n\n"
                        + "Best regards,\n"
                        + "Your Support Team";
                otpVerificationDao.save(prepareOtpVerification(email, otp, user.getId()));
                mailService.sendMail(email, subject, body);
                return HotelUtils.getResponse("Password reset Otp sent successfully.", HttpStatus.OK);
            }

        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private OtpVerification prepareOtpVerification(String email, Integer otp, Integer userid) {
        OtpVerification user = new OtpVerification();
        user.setOtp(otp);
        user.setUserId(userid);
        user.setExpiryTime(LocalDateTime.now().plusMinutes(2));
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return user;
    }

    private boolean validateForgetPasswordMap(Map<String,String> requestMap){
        return requestMap.containsKey("email");
    }

    @Override
    public ResponseEntity<String> validateOtp(Map<String, String> requestMap) {
        try {
            System.out.println(requestMap);
            if (validateValidateOtpMap(requestMap)) {
                System.out.println(requestMap.get("email"));
                User user = userDao.findByEmailId(requestMap.get("email"));
                System.out.println(user);
                if (Objects.isNull(user)) {
                    return HotelUtils.getResponse(HotelConstant.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
                } else {
                    OtpVerification otpVerification = otpVerificationDao.userFindByUserId(user.getId());
                    if (Objects.isNull(otpVerification)) {
                        return HotelUtils.getResponse(HotelConstant.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
                    } else {
                        if (isOtpMatchWithUserOtp(requestMap, otpVerification.getOtp())) {
                            if (isOtpExpired(otpVerification.getExpiryTime())) {
                                return HotelUtils.getResponse(HotelConstant.OTP_EXPIRED, HttpStatus.BAD_REQUEST);
                            } else {
                                return HotelUtils.getResponse("OTP validated successfully!", HttpStatus.OK);
                            }
                        } else {
                            return HotelUtils.getResponse(HotelConstant.INVALID_OTP, HttpStatus.BAD_REQUEST);
                        }
                    }
                }
            } else {
                return HotelUtils.getResponse(HotelConstant.INVALID_CREDENTIALS, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    private boolean validateValidateOtpMap(Map<String, String> requestMap) {
        return requestMap.containsKey("email") && requestMap.containsKey("otp");
    }

    private boolean isOtpExpired(LocalDateTime expiry) {
        return expiry.isBefore(LocalDateTime.now());
    }

    private boolean isOtpMatchWithUserOtp(Map<String, String> requestMap, Integer otp) {
        try {
            Integer otpFromRequest = Integer.valueOf(requestMap.get("otp"));
            return otpFromRequest.equals(otp);
        } catch (NumberFormatException e) {
            return false;
        }
    }


    @Override
    public ResponseEntity<String> resetPassword(Map<String, String> requestMap) {
        try{
            if(validateResetPasswordMap(requestMap)){
                User user = userDao.findByEmailId(requestMap.get("email"));
                if(Objects.isNull(user)){
                    return HotelUtils.getResponse(HotelConstant.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
                }else {
                    OtpVerification resetRequestUser=otpVerificationDao.userFindByUserId(user.getId());
                    if(Objects.isNull(resetRequestUser)){
                        return HotelUtils.getResponse(HotelConstant.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
                    }else{
                        user.setPassword(encoder.encode(requestMap.get("password")));
                        user.setUpdatedAt(LocalDateTime.now());
                        userDao.save(user);
                        return HotelUtils.getResponse("Password Changed Successfully", HttpStatus.OK);
                    }
                }
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> refreshToken(HttpServletRequest request) {
        try{
        Cookie refreshTokenCookie=getCookie(request,"refresh-token");
            if (refreshTokenCookie == null) {
                return HotelUtils.getResponse("Refresh token cookie is missing", HttpStatus.UNAUTHORIZED);
            }else{
                String refreshToken=refreshTokenCookie.getValue();
                if(refreshToken.startsWith("Bearer ")){
                    refreshToken = refreshToken.substring(7);
                    String username = jwtService.extractRefreshTokenUsername(refreshToken);
                    UserDetails userDetails = costumUserDetailsService.loadUserByUsername(username);
                    if (jwtService.validateRefreshToken(refreshToken, userDetails)) {
                        String token=jwtService.generateToken(username,"user");
                        ResponseEntity<String> response = ResponseEntity
                                .ok()
                                .body("{\"message\":\"Access token has been refreshed successfully..\",\"access-token\":\"" + token + "\"}");
                        return response;
                    }else{
                        return HotelUtils.getResponse("Your session has expired.", HttpStatus.UNAUTHORIZED);
                    }
                }else{
                    return HotelUtils.getResponse("Invalid token format", HttpStatus.UNAUTHORIZED);
                }
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {
       try{
           Cookie accessTokenCookie=new Cookie("refresh-token",null);
           accessTokenCookie.setHttpOnly(true);
           accessTokenCookie.setSecure(true);
           accessTokenCookie.setPath("/");
           accessTokenCookie.setMaxAge(0);
           response.addCookie(accessTokenCookie);
           return HotelUtils.getResponse("Successfully logged out.", HttpStatus.OK);
       } catch (Exception e) {
           logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
       }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserResponseWrapper>> getAllActiveUsers() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            Integer hotelId=userPrincipal.getHotelId();
            System.out.println(hotelId);
            if(hotelId != null){
                List<UserResponseWrapper> user=reservationDao.getAllActiveUsersByHotel(hotelId);
                System.out.println(user);
                return new ResponseEntity<>(user,HttpStatus.OK);
            }else{
                List<UserResponseWrapper> user=userDao.getAllActiveUsers();
                return new ResponseEntity<>(user,HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
        }
        return  new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<UserResponseWrapper> getUserProfile() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer userId=userPrincipal.getId();
            UserResponseWrapper user=userDao.getUserProfile(userId);
            return new ResponseEntity<>(user,HttpStatus.OK);
        } catch (Exception e) {
        logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
    }
        return new ResponseEntity<>(new UserResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePassword(UpdateAuthPasswordWrapper authPasswordWrapper) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer userId=userPrincipal.getId();
            Optional<User> userOptional = userDao.findById(userId);
            if (userOptional.isEmpty()) {
                return HotelUtils.getResponse("User not found", HttpStatus.NOT_FOUND);
            }
            User user = userOptional.get();
            if (!encoder.matches(authPasswordWrapper.getOldPassword(), user.getPassword())) {
                return HotelUtils.getResponse("Old password is incorrect", HttpStatus.BAD_REQUEST);
            }else{
                user.setPassword(encoder.encode(authPasswordWrapper.getNewPassword()));
                userDao.save(user);
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> adminSignIn(Map<String, String> requestMap, HttpServletResponse response) {
        try {
            if (validateSignInMap(requestMap)) {
                Authentication auth = authManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                requestMap.get("email"),
                                requestMap.get("password")
                        )
                );

                if (auth.isAuthenticated()) {
                    UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
                    String username = userPrincipal.getUsername();
                    String role = userPrincipal.getAuthorities().iterator().next().getAuthority();

                    if (!"super admin".equals(role)) {
                        return HotelUtils.getResponse("Access denied. Only super admin can sign in here.", HttpStatus.FORBIDDEN);
                    }

                    String token = jwtService.generateToken(username, role);
                    String refreshToken = jwtService.generateRefreshToken(username, "user");

                    Cookie cookie = new Cookie("refresh-token", refreshToken);
                    cookie.setHttpOnly(true);
                    cookie.setSecure(true);
                    cookie.setPath("/");
                    cookie.setMaxAge(7 * 24 * 60 * 60);
                    cookie.setDomain("localhost");

                    response.addCookie(cookie);

                    String jsonResponse = String.format(
                            "{\"message\":\"Successfully Login.\",\"access-token\":\"%s\",\"role\":\"%s\"}",
                            token,
                            role
                    );

                    return new ResponseEntity<>(jsonResponse, HttpStatus.OK);
                } else {
                    return HotelUtils.getResponse("Invalid Credentials.", HttpStatus.BAD_REQUEST);
                }
            } else {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in AuthServiceImpl {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    private boolean validateResetPasswordMap(Map<String,String> requestMap){
        return requestMap.containsKey("email") && requestMap.containsKey("password");
    }

    private Cookie getCookie(HttpServletRequest request, String name) {
        if (request.getCookies() == null) return null;
        for (Cookie cookie : request.getCookies()) {
            if (cookie.getName().equals(name)) {
                return cookie;
            }
        }
        return null;
    }



}
