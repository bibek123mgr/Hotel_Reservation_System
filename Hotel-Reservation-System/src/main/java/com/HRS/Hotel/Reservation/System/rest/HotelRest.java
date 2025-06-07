package com.HRS.Hotel.Reservation.System.rest;


import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.wrapper.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1")
public interface HotelRest {

    @PostMapping(value = "/auth/hotel-registration", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addHotel(
            @RequestPart("hotelData") HotelCreateRequestWrapper hotelCreateRequestWrapper,
            @RequestPart("image") MultipartFile imageFile
    );

    @PostMapping(value = "/auth/hotel-update")
    public ResponseEntity<String> updateHotelProfile(
             @RequestBody HotelUpdateRequestWrapper HotelUpdateRequestWrapper
    );

    @PostMapping("/auth/hotel-signin")
    public ResponseEntity<String> signIn(@RequestBody HotelSignInRequestWrapper hotelSignInRequestWrapper, HttpServletResponse response);

    @PostMapping("/auth/verify-registration-khalti")
    public ResponseEntity<String> verifySubscriptionKhaltiPaymet(@RequestBody KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper);

    @GetMapping("/hotels")
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableHotels(@RequestParam(required = true)Map<String,String> queryParams);

    @GetMapping("/auth/allactivehotels")
    public ResponseEntity<List<GetAllActiveHotelsWrapper>> getAllAvailableHotelsForLoginPage();

    @GetMapping("/gethotelprofile")
    public ResponseEntity<Hotel> getHotelProfile();

    @PostMapping("/hotels/near-me")
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableNearByHotels(@RequestBody(required = true) HotelNearByRequestWrapper requestQuery);

    @GetMapping("/dashboard-summery")
    public ResponseEntity<DashboardSummeryResponseWrapper> getDashboardSummery();

    @GetMapping("/payment-summery")
    public ResponseEntity<PaymentSummeryResponse> getPaymentSummery();


}
