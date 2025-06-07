package com.HRS.Hotel.Reservation.System.rest;


import com.HRS.Hotel.Reservation.System.wrapper.ForgotRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UpdateAuthPasswordWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1/auth")
public interface AuthRest {

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody(required = true)Map<String,String> requestMap);

    @PostMapping("/signin")
    public ResponseEntity<String> signIn(@RequestBody(required = true)Map<String,String> requestMap,HttpServletResponse response);

    @PostMapping("/signin-admin")
    public ResponseEntity<String> adminSignIn(@RequestBody(required = true)Map<String,String> requestMap,HttpServletResponse response);

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgetPassword(@RequestBody ForgotRequestWrapper forgotRequestWrapper);

    @PostMapping("/verify-otp")
    public ResponseEntity<String> validateOtp(@RequestBody(required = true) Map<String, String> requestMap);

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> requestMap);

    @PostMapping("/update-password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdateAuthPasswordWrapper authPasswordWrapper);

    @PostMapping("/refresh-token")
    public ResponseEntity<String> refreshToken(HttpServletRequest request);

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response);

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseWrapper>> getAllActiveUsers();

    @GetMapping("/getuserprofile")
    public ResponseEntity<UserResponseWrapper> getUserProfile();

}
