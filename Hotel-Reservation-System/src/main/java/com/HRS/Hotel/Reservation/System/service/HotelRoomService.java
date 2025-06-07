package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomDetailPublicRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface HotelRoomService {
    ResponseEntity<String> addHotelRoom(RoomRequestWrapper roomRequestWrapper, MultipartFile file);

    ResponseEntity<String> updateHotelRoom(RoomRequestWrapper roomRequestWrapper, Integer roomId);

    ResponseEntity<List<RoomResponseWrapper>> getAllSpecificHotelRoom(Integer roomCategoryId);

    ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoom();

    ResponseEntity<String> deleteHotelRoom(Integer roomId);

    ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoomForPublic();

    ResponseEntity<RoomResponseWrapper> getHotelRoomDetailForPublic(Integer hotelId, Integer roomCategoryId);

    ResponseEntity<String> updateHotelRoomStatus(Integer roomId, RoomStatus roomStatus);
}
