package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.wrapper.CreateCategoryWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1")
public interface HotelRoomCategoryRest {

    @PostMapping("/hotel-rooms-category")
    public ResponseEntity<String> addHotelRoomsCategory(@RequestBody(required = true) CreateCategoryWrapper requestMap);

    @GetMapping("/hotel-rooms-category")
    public ResponseEntity<List<HotelRoomCategoryWrapper>> getAllHotelRoomsCategory(@RequestParam(required = false)Map<String,String> request);

    @PutMapping("/hotel-rooms-category")
    public ResponseEntity<String> updateHotelRoomsCategory(@RequestBody(required = true) CreateCategoryWrapper requestMap);

    @PatchMapping("/hotel-rooms-category/{id}")
    public ResponseEntity<HotelRoomCategoryWrapper> getOneHotelRoomsCategory(@PathVariable Integer id);

    @DeleteMapping("/hotel-rooms-category/{id}")
    public ResponseEntity<String> deleteHotelRoomsCategory(@PathVariable Integer id);
}
