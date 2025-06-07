package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.HotelRoomCategoryDao;
import com.HRS.Hotel.Reservation.System.POJO.*;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.HotelRoomCategoryService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class HotelRoomCategoryServiceImpl implements HotelRoomCategoryService {

    private static final Logger logger= LoggerFactory.getLogger(HotelRoomCategoryServiceImpl.class);

    @Autowired
    private HotelRoomCategoryDao hotelRoomCategoryDao;

    @Override
    public ResponseEntity<String> addHotelRoomsCategory(Map<String, String> requestMap) {
        try{
            if(validateSaveNewHotelRoomCategoryMap(requestMap)){
                hotelRoomCategoryDao.save(mapSaveRoomCategory(requestMap));
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.CREATED);
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            logger.error("Error occurred in HotelRoomCategoryServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<HotelRoomCategoryWrapper>> getAllHotelRoomsCategory(Map<String, String> requestMap) {
        try {
            List<HotelRoomCategoryWrapper> hotelRoomCategoryWrapper = hotelRoomCategoryDao.getAllRoomCategories();
            return new ResponseEntity<>(hotelRoomCategoryWrapper, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in HotelRoomCategoryServiceImpl {}", e.getMessage(), e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateHotelRoomsCategory(Map<String, String> requestMap) {
        try{
            if(validateSaveNewHotelRoomCategoryMap(requestMap)){
                Integer id = Integer.parseInt(requestMap.get("id").toString());

                Optional<RoomCategory> category=hotelRoomCategoryDao.findById(id);
                if(category.isPresent()) {
                    RoomCategory updatedCategory = mapUpdateRoomCategory(requestMap, category.get());
                    hotelRoomCategoryDao.save(updatedCategory);
                    return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
                }else{
                    return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            logger.error("Error occurred in HotelRoomCategoryServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<HotelRoomCategoryWrapper> getOneHotelRoomsCategory(Integer id) {
        try {
            HotelRoomCategoryWrapper hotelRoomCategoryWrapper = hotelRoomCategoryDao.getOneRoomCategories(id);
            return new ResponseEntity<>(hotelRoomCategoryWrapper, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in HotelRoomCategoryServiceImpl {}", e.getMessage(), e);
        }
        return new ResponseEntity<>(new HotelRoomCategoryWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteHotelRoomsCategory(Integer id) {
        try {
            Optional<RoomCategory> category = hotelRoomCategoryDao.findById(id);
            if (category.isPresent()) {
                RoomCategory roomCategory = category.get();
                roomCategory.setStatus(false);
                hotelRoomCategoryDao.save(roomCategory);
                return new ResponseEntity<>("Room category deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Room category not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error("Error in deleteHotelRoomsCategory: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR);

    }



    private boolean validateGetAllHotelRoomCategoryMap(Map<String, String> requestMap){
            return requestMap.containsKey("roomType")
                    && requestMap.containsKey("order")
                    && requestMap.containsKey("limit")
                    && requestMap.containsKey("offset")
                    && requestMap.containsKey("minPrice")
                    && requestMap.containsKey("maxPrice")
                    && requestMap.containsKey("longitude")
                    && requestMap.containsKey(("latitude"))
                    && requestMap.containsKey(("radius"))
                    ;
    }

    private boolean validateSaveNewHotelRoomCategoryMap(Map<String, String> requestMap) {
        return requestMap.containsKey("roomCategoryType")
                && requestMap.containsKey("mediaId")
                && requestMap.containsKey("createdBy")
                && requestMap.containsKey("description")
                && requestMap.containsKey("isAvailable");
    }

    private boolean validateUpdateNewHotelRoomCategoryMap(Map<String, String> requestMap) {
        return requestMap.containsKey("roomCategoryType")
                && requestMap.containsKey("id")
                && requestMap.containsKey("createdBy")
                && requestMap.containsKey("description")
                && requestMap.containsKey("isAvailable");
    }


    private RoomCategory mapUpdateRoomCategory(Map<String, String> requestMap,RoomCategory category){
        category.setRoomCategoryType(requestMap.get("roomCategoryType"));
        category.setStatus(Boolean.parseBoolean(requestMap.get("isAvailable")));
        category.setDescription(requestMap.get("description"));
        return category;
    }

    private RoomCategory mapSaveRoomCategory(Map<String, String> requestMap) {
        RoomCategory roomCategory = new RoomCategory();
        MediaFile media = new MediaFile();
        media.setId(Integer.parseInt(requestMap.get("mediaId")));
        roomCategory.setImageUrl(media);
        User user = new User();
        user.setId(Integer.parseInt(requestMap.get("createdBy")));
        roomCategory.setCreatedBy(user);
        roomCategory.setRoomCategoryType(requestMap.get("roomCategoryType"));
        roomCategory.setDescription(requestMap.get("description"));
        roomCategory.setStatus(Boolean.parseBoolean(requestMap.get("isAvailable")));
        return roomCategory;
    }


}
