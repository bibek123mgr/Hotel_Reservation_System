package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "hotel_high_level_info")

public class HotelHighInfoDetail implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn()
    private Hotel hotel;
    private String description;

    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String googleMapLink;
    private Double longitude;
    private Double latitude;
    private String checkInTime;
    private String checkOutTime;

    @JoinColumn(name = "id")
    @OneToOne(fetch = FetchType.LAZY)
    private User savedBy;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
