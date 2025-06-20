package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class HotelListWrapper {
    private Integer id;
    private String hotelName;
    private String description;
    private String address;
    private String imageUrl;
    private String checkInTime;
    private String checkOutTime;

    public HotelListWrapper(Integer id, String hotelName, String description,
                            String address,String imageUrl, String checkInTime, String checkOutTime) {
        this.id = id;
        this.hotelName = hotelName;
        this.description = description;
        this.address = address;
        this.imageUrl = "http://localhost:8080" + imageUrl;
        this.checkInTime = checkInTime;
        this.checkOutTime = checkOutTime;
    }

}
