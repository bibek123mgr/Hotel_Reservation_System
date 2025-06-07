package com.HRS.Hotel.Reservation.System.wrapper;
import com.HRS.Hotel.Reservation.System.enums.PaymentMethod;
import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ReservationRequestWrapper {

    private Integer hotelId;
    private Integer roomCategoryId;
    private Integer roomId;
    private PaymentMethod paymentMethod;
    private Integer bookedBy;
    private Integer createdBy;
    private ReservationStatus reservationStatus;
    private Double price;
    private LocalDateTime checkInDate;
    private LocalDateTime checkOutDate;
    private Integer numberOfGuests;

}
