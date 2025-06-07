package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class HotelSignInRequestWrapper {

    private Integer hotelCode;
    private String email;
    private String password;

}
