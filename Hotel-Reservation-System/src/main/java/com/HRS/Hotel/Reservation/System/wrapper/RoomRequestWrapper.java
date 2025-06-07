package com.HRS.Hotel.Reservation.System.wrapper;

import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import lombok.Data;

@Data
public class RoomRequestWrapper {

    private String roomTitle;
    private String roomNumber;
    private Integer floor;
    private Integer capacity;
    private Double price;
    private String description;
    private Integer roomCategoryId;
    private RoomStatus roomStatus;
    private Boolean status;

}
