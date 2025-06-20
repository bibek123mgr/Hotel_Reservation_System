package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.CreateCategoryWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface HotelRoomCategoryService {
    public ResponseEntity<String> addHotelRoomsCategory(CreateCategoryWrapper requestMap) ;

    public  ResponseEntity<List<HotelRoomCategoryWrapper>> getAllHotelRoomsCategory(Map<String, String> requestMap);

    public ResponseEntity<String> updateHotelRoomsCategory(CreateCategoryWrapper requestMap) ;

    ResponseEntity<HotelRoomCategoryWrapper> getOneHotelRoomsCategory(Integer id);

    ResponseEntity<String> deleteHotelRoomsCategory(Integer id);
}
