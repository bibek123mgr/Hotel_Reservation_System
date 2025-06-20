package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomDetailPublicRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/v1/rooms")
public interface HotelRoomRest {

    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> addHotelRoom( @RequestPart("roomRequestWrapper") RoomRequestWrapper roomRequestWrapper,
                                                @RequestPart("file") MultipartFile file);

    @PatchMapping(value = "/{roomId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateHotelRoom(
            @RequestPart("roomRequestWrapper") RoomRequestWrapper roomRequestWrapper,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Integer roomId
    );

    @GetMapping("/{roomCategoryId}")
    public ResponseEntity<List<RoomResponseWrapper>> getAllSpecificHotelRoom(@PathVariable Integer roomCategoryId);

    @GetMapping()
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoom();

    @GetMapping("/public")
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoomForPublic();

    @GetMapping("/public/{hotelId}")
    public ResponseEntity<List<RoomResponseWrapper>> getAllSpecificHotelRoomForPublic(@PathVariable Integer hotelId);

    @GetMapping("/public-room-details")
    public ResponseEntity<RoomResponseWrapper> getHotelRoomDetailForPublic(@RequestParam Integer hotelId,
                                                                           @RequestParam Integer roomCategoryId);
    @DeleteMapping("/{roomId}")
    public ResponseEntity<String> deleteHotelRoom(@PathVariable Integer roomId);

    @PatchMapping("/{roomId}/{roomStatus}")
    public ResponseEntity<String> updateHotelRoomStatus(@PathVariable Integer roomId ,@PathVariable
    RoomStatus roomStatus);

}
