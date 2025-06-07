package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class HotelUpdateRequestWrapper {
    private int id;
    private String address;
    private String checkInTime;
    private String checkOutTime;
    private String city;
    private String description;
    private String googleMapLink;
    private String hotelName;
    private Double latitude;
    private Double longitude;
    private String state;
    private String zipCode;

}
