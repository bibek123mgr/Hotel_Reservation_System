package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface HotelRoomCategoryService {
    public ResponseEntity<String> addHotelRoomsCategory(Map<String, String> requestMap) ;

    public  ResponseEntity<List<HotelRoomCategoryWrapper>> getAllHotelRoomsCategory(Map<String, String> requestMap);

    public ResponseEntity<String> updateHotelRoomsCategory(Map<String, String> requestMap) ;

    ResponseEntity<HotelRoomCategoryWrapper> getOneHotelRoomsCategory(Integer id);

    ResponseEntity<String> deleteHotelRoomsCategory(Integer id);
}
