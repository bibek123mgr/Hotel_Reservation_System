package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import com.HRS.Hotel.Reservation.System.rest.HotelRoomRest;
import com.HRS.Hotel.Reservation.System.service.HotelRoomService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomDetailPublicRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
public class HotelRoomRestImpl implements HotelRoomRest {

    private static final Logger logger= LoggerFactory.getLogger(HotelRoomRestImpl.class);

    @Autowired
    private HotelRoomService hotelRoomService;

    @Override
    public ResponseEntity<String> addHotelRoom(RoomRequestWrapper roomRequestWrapper, MultipartFile file) {
        try {
            return hotelRoomService.addHotelRoom(roomRequestWrapper,file);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateHotelRoom(RoomRequestWrapper roomRequestWrapper, Integer roomId) {
        try {
            return hotelRoomService.updateHotelRoom(roomRequestWrapper,roomId);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllSpecificHotelRoom(Integer roomCategoryId) {
        try {
            return hotelRoomService.getAllSpecificHotelRoom(roomCategoryId);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoom() {
        try {
            return hotelRoomService.getAllHotelRoom();
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoomForPublic() {
        try {
            return hotelRoomService.getAllHotelRoomForPublic();
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<RoomResponseWrapper> getHotelRoomDetailForPublic( Integer hotelId, Integer roomCategoryId) {
        try {
            return hotelRoomService.getHotelRoomDetailForPublic(hotelId,roomCategoryId);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new RoomResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteHotelRoom(Integer roomId) {
        try {
            return hotelRoomService.deleteHotelRoom(roomId);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateHotelRoomStatus(Integer roomId, RoomStatus roomStatus) {
        try {
            return hotelRoomService.updateHotelRoomStatus(roomId,roomStatus);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
