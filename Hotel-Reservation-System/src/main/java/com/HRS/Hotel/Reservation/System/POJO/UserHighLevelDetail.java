package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

public class UserHighLevelDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private String phoneNumber;
    private String address;
    private String dateOfBirth;
    private String profileUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
