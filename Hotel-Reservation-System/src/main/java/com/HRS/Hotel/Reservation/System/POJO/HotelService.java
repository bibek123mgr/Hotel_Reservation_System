package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import org.springframework.http.ResponseEntity;

import java.io.Serializable;
import java.util.Map;

public class HotelService implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer hotelId;
    private String ServiceId;
    private Boolean isAvailable;


}
