package com.HRS.Hotel.Reservation.System.rest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequestMapping("/api/v1/hotel-admin/profile")
public interface HotelHighInfoDetailRest {
    @PostMapping()
    public ResponseEntity<String> saveHotelProfileDetailInfo(@RequestBody(required = true) Map<String,String> requestMap);

}
