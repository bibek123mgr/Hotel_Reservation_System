package com.HRS.Hotel.Reservation.System.service;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.Map;

public interface HotelHighInfoDetailService {
    public ResponseEntity<String> saveHotelProfileDetailInfo(Map<String,String> requestMap);

}
