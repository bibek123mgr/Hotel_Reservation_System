package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class CreateCommentRequestWrapper {

    private Double star;
    private String description;
    private Integer reservationId;

}
