package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class GetCommentRequestWrapper {
    private Integer hotelId;
    private Integer roomCategoryId;
}
