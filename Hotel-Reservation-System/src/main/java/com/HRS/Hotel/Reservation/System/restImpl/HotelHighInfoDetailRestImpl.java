package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.HotelHighInfoDetailRest;
import com.HRS.Hotel.Reservation.System.service.HotelHighInfoDetailService;
import com.HRS.Hotel.Reservation.System.serviceImpl.HotelHighInfoDetailServiceImpl;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HotelHighInfoDetailRestImpl implements HotelHighInfoDetailRest {

    public static final Logger logger= LoggerFactory.getLogger(HotelHighInfoDetailRestImpl.class);

    @Autowired
    private HotelHighInfoDetailService hotelHighInfoDetailService;

    @Override
    public ResponseEntity<String> saveHotelProfileDetailInfo(Map<String, String> requestMap) {
        try{
            return hotelHighInfoDetailService.saveHotelProfileDetailInfo(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred at saveHotelProfileDetailInfo {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
