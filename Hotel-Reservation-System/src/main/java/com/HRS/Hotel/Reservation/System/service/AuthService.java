package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.ForgotRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UpdateAuthPasswordWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface AuthService {

    ResponseEntity<String> signIn(Map<String, String> requestMap,HttpServletResponse response);
    ResponseEntity<String> signUp(Map<String, String> requestMap);
    ResponseEntity<String> forgetPassword(ForgotRequestWrapper forgotRequestWrapper);
    ResponseEntity<String> validateOtp(Map<String,String> requestMap);
    ResponseEntity<String> resetPassword(Map<String, String> requestMap);
    ResponseEntity<String> refreshToken(HttpServletRequest request);
    ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response);

    ResponseEntity<List<UserResponseWrapper>> getAllActiveUsers();

    ResponseEntity<String> adminSignIn(Map<String, String> requestMap, HttpServletResponse response);

    ResponseEntity<UserResponseWrapper> getUserProfile();

    ResponseEntity<String> updatePassword(UpdateAuthPasswordWrapper authPasswordWrapper);
}
