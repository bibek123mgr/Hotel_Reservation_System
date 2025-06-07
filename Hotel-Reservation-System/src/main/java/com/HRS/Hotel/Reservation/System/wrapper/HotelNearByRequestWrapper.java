package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class HotelNearByRequestWrapper {

    private Double longitude;
    private Double latitude;
    private Integer radius;
}
