package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.wrapper.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface HotelService {
    ResponseEntity<List<HotelListWrapper>> getAllAvailableHotels(Map<String, String> queryParams);

    ResponseEntity<List<HotelListWrapper>> getAllAvailableNearByHotels(HotelNearByRequestWrapper requestQuery);

    ResponseEntity<String> verifySubscriptionKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper);

    ResponseEntity<String> signIn(HotelSignInRequestWrapper hotelSignInRequestWrapper, HttpServletResponse response);

    ResponseEntity<List<GetAllActiveHotelsWrapper>> getAllAvailableHotelsForLoginPage();

    ResponseEntity<String> addHotel(HotelCreateRequestWrapper hotelCreateRequestWrapper, MultipartFile imageFile);

    ResponseEntity<Hotel> getHotelProfile();

    ResponseEntity<DashboardSummeryResponseWrapper> getDashboardSummery();

    ResponseEntity<PaymentSummeryResponse> getPaymentSummery();

    ResponseEntity<String> updateHotelProfile(HotelUpdateRequestWrapper hotelUpdateRequestWrapper);
}
