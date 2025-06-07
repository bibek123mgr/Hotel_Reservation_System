package com.HRS.Hotel.Reservation.System.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class HotelUtils {

    private HotelUtils(){}

    public static ResponseEntity<String> getResponse(String responseMsg, HttpStatus httpStatus){
        return new ResponseEntity<>("{\"message\":\""+responseMsg+"\"}",httpStatus);
    }
}
