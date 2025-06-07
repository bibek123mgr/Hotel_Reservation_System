package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.HotelRoomCategoryRest;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.HRS.Hotel.Reservation.System.service.HotelRoomCategoryService;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class HotelRoomCategoryRestImpl implements HotelRoomCategoryRest {

    private static final Logger logger = LoggerFactory.getLogger(HotelRoomCategoryRestImpl.class);

    @Autowired
    private HotelRoomCategoryService hotelRoomCategoryService;

    @Override
    public ResponseEntity<String> addHotelRoomsCategory(Map<String, String> requestMap) {
        try{
            return hotelRoomCategoryService.addHotelRoomsCategory(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomCategoryRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<HotelRoomCategoryWrapper>> getAllHotelRoomsCategory(Map<String, String> requestMap) {
        try{
            return hotelRoomCategoryService.getAllHotelRoomsCategory(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomCategoryRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateHotelRoomsCategory(Map<String, String> requestMap) {
        try{
            return hotelRoomCategoryService.updateHotelRoomsCategory(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomCategoryRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<HotelRoomCategoryWrapper> getOneHotelRoomsCategory(Integer id) {
        try{
            return hotelRoomCategoryService.getOneHotelRoomsCategory(id);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomCategoryRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new HotelRoomCategoryWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteHotelRoomsCategory(Integer id) {
        try{
            return hotelRoomCategoryService.deleteHotelRoomsCategory(id);
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomCategoryRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
