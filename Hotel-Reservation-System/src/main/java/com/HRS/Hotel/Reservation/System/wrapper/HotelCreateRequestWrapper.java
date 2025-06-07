package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class HotelCreateRequestWrapper {

    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role = "hotel_admin";

    private Integer subscriptionId;
    private String subscriptionType;
    private Integer subscriptionDuration;

    private String hotelName;
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
}
