package com.HRS.Hotel.Reservation.System.wrapper;

import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RoomResponseWrapper {

    private Integer id;
    private Integer hotelId;
    private String hotelName;
    private String roomNumber;
    private String roomTitle;
    private Integer roomCategoryId;
    private String roomCategory;
    private Integer floor;
    private Integer capacity;
    private Double price;
    private String description;
    private RoomStatus roomStatus;
    private Boolean status;
    private LocalDateTime createdAt;
    private Long roomCount;
    private String imageUrl;


    public RoomResponseWrapper(Integer id, Integer hotelId, String hotelName,
                               String roomNumber, String roomTitle, Integer roomCategoryId, String roomCategory,
                               Integer floor, Integer capacity, Double price, String description,
                               RoomStatus roomStatus, Boolean status, LocalDateTime createdAt,String imageUrl) {
        this.id = id;
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.roomNumber = roomNumber;
        this.roomTitle = roomTitle;
        this.roomCategoryId = roomCategoryId;
        this.roomCategory = roomCategory;
        this.floor = floor;
        this.capacity = capacity;
        this.price = price;
        this.description = description;
        this.roomStatus = roomStatus;
        this.status = status;
        this.createdAt = createdAt;
        this.imageUrl="http://localhost:8080"+imageUrl;
    }

    public RoomResponseWrapper(Integer id, Integer hotelId, String hotelName,
                               String roomNumber, String roomTitle, Integer roomCategoryId, String roomCategory,
                               Integer floor, Integer capacity, Double price, String description,
                               RoomStatus roomStatus, Boolean status, LocalDateTime createdAt, Long roomCount,String imageUrl) {
        this.id = id;
        this.hotelId = hotelId;
        this.hotelName = hotelName;
        this.roomNumber = roomNumber;
        this.roomTitle = roomTitle;
        this.roomCategoryId = roomCategoryId;
        this.roomCategory = roomCategory;
        this.floor = floor;
        this.capacity = capacity;
        this.price = price;
        this.description = description;
        this.roomStatus = roomStatus;
        this.status = status;
        this.createdAt = createdAt;
        this.roomCount = roomCount;
        this.imageUrl="http://localhost:8080"+imageUrl;

    }

}
