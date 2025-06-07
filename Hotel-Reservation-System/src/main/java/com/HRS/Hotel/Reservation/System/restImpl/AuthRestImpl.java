package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.AuthRest;
import com.HRS.Hotel.Reservation.System.service.AuthService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.ForgotRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UpdateAuthPasswordWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class AuthRestImpl implements AuthRest {

    @Autowired
    private AuthService authService;

    private static final Logger logger= LoggerFactory.getLogger(AuthRestImpl.class);

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        try{
            return authService.signUp(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<String> signIn(Map<String, String> requestMap,HttpServletResponse response) {
        try{
            System.out.println("i am running");
            return authService.signIn(requestMap,response);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    }

    @Override
    public ResponseEntity<String> adminSignIn(Map<String, String> requestMap, HttpServletResponse response) {
        try{
            return authService.adminSignIn(requestMap,response);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> forgetPassword(ForgotRequestWrapper forgotRequestWrapper) {
        try{
            return authService.forgetPassword(forgotRequestWrapper);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> validateOtp(Map<String, String> requestMap) {
        try{
            return authService.validateOtp(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> resetPassword(Map<String, String> requestMap) {
        try{
            return authService.resetPassword(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePassword(UpdateAuthPasswordWrapper authPasswordWrapper) {
        try{
            return authService.updatePassword(authPasswordWrapper);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);    }

    @Override
    public ResponseEntity<String> refreshToken(HttpServletRequest request) {
        try{
            return authService.refreshToken(request);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        try{
            return authService.logoutUser(request,response);
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<UserResponseWrapper>> getAllActiveUsers() {
       try{
           return authService.getAllActiveUsers();
       } catch (Exception e) {
           logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
       }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<UserResponseWrapper> getUserProfile() {
        try{
            return authService.getUserProfile();
        } catch (Exception e) {
            logger.error("Error occurred in AuthRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new UserResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);    }
}
