package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GetAllActiveHotelsWrapper {
    private Integer id;
    private Integer hotelCode;
    private String hotelName;

    public GetAllActiveHotelsWrapper(Integer id, Integer hotelCode, String hotelName) {
        this.id = id;
        this.hotelCode = hotelCode;
        this.hotelName = hotelName;
    }
}
