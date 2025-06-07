package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class HotelReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer hotelId;
    private Integer userId;
    private Integer reservationId;
    private String roomId;
    private Float rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


}
