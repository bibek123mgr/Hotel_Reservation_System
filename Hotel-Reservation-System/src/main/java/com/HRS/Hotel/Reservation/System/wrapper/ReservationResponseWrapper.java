package com.HRS.Hotel.Reservation.System.wrapper;

import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ReservationResponseWrapper {

    private Integer id;
    private Integer userId;
    private String userName;
    private String userEmail;
    private Integer hotelId;
    private String hotelName;
    private Integer roomCategoryId;
    private String roomCategory;
    private Integer roomId;
    private String roomNumber;
    private ReservationStatus reservationStatus;
    private Double price;
    private Integer numberOfGuests;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private LocalDateTime createdAt;

    public ReservationResponseWrapper(
            Integer id,
            Integer userId,
            String userName,
            String userEmail,
            Integer hotelId,
            String hotelName,
            Integer roomCategoryId,
            String roomCategory,
            Integer roomId,
            String roomNumber,
            ReservationStatus reservationStatus,
            Double price,
            Integer numberOfGuests,
            LocalDateTime checkInDate,
            LocalDateTime checkOutDate,
            LocalDateTime createdAt) {
        this.id = id;
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.roomCategoryId = roomCategoryId;
        this.roomCategory = roomCategory;
        this.roomId = roomId;
        this.roomNumber = roomNumber;
        this.reservationStatus = reservationStatus;
        this.price = price;
        this.numberOfGuests = numberOfGuests;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.createdAt = createdAt;
    }

}
