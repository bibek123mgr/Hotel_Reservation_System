package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.HotelHighInfoDetailDao;
import com.HRS.Hotel.Reservation.System.POJO.HotelHighInfoDetail;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.HotelHighInfoDetailService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@Transactional
public class HotelHighInfoDetailServiceImpl implements HotelHighInfoDetailService {

    public static final Logger logger= LoggerFactory.getLogger(HotelHighInfoDetailServiceImpl.class);

    @Autowired
    private HotelHighInfoDetailDao highInfoDetailDao;

    @Override
    public ResponseEntity<String> saveHotelProfileDetailInfo(Map<String, String> requestMap) {
       try{
            if(validateSaveHotelProfileDetailInfoMap(requestMap)){
                highInfoDetailDao.save(mapRequestMapInHotelHighInfoDetail(requestMap));
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
       } catch (Exception e) {
           logger.error("Error occurred at saveHotelProfileDetailInfo {}",e.getMessage(),e);
       }
       return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Boolean validateSaveHotelProfileDetailInfoMap(Map<String, String> requestMap){
        return requestMap.containsKey("hotelId") &&
                requestMap.containsKey("description") &&
                requestMap.containsKey("address") &&
                requestMap.containsKey("city") &&
                requestMap.containsKey("state") &&
                requestMap.containsKey("zipCode") &&
                requestMap.containsKey("googleMapLink") &&
                requestMap.containsKey("longitude") &&
                requestMap.containsKey("latitude") &&
                requestMap.containsKey("checkInTime") &&
                requestMap.containsKey("checkOutTime");
    }

    private HotelHighInfoDetail mapRequestMapInHotelHighInfoDetail(Map<String, String> requestMap) {
        HotelHighInfoDetail hotelHighInfoDetail = new HotelHighInfoDetail();
//        hotelHighInfoDetail.setHotelId(requestMap.get("hotelId"));
//        hotelHighInfoDetail.setSavedBy(Integer.parseInt(requestMap.get("userId")));
        hotelHighInfoDetail.setDescription(requestMap.get("description"));
        hotelHighInfoDetail.setAddress(requestMap.get("address"));
        hotelHighInfoDetail.setCity(requestMap.get("city"));
        hotelHighInfoDetail.setState(requestMap.get("state"));
        hotelHighInfoDetail.setZipCode(requestMap.get("zipCode"));
        hotelHighInfoDetail.setGoogleMapLink(requestMap.get("googleMapLink"));
        hotelHighInfoDetail.setLongitude(Double.parseDouble(requestMap.get("longitude")));
        hotelHighInfoDetail.setLatitude(Double.parseDouble(requestMap.get("latitude")));
        hotelHighInfoDetail.setCheckInTime(requestMap.get("checkInTime"));
        hotelHighInfoDetail.setCheckOutTime(requestMap.get("checkOutTime"));
        hotelHighInfoDetail.setUpdatedAt(LocalDateTime.now());
        hotelHighInfoDetail.setCreatedAt(LocalDateTime.now());
        return hotelHighInfoDetail;
    }

}
