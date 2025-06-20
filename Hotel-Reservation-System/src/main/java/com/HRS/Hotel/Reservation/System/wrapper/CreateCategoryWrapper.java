package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class CreateCategoryWrapper {

    private Integer id;
    private String roomCategoryType;
    private  String description;
}
