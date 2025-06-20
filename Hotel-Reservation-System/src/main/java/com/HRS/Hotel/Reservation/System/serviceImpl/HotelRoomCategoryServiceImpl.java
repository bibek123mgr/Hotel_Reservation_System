package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.HotelRoomCategoryDao;
import com.HRS.Hotel.Reservation.System.POJO.*;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.HotelRoomCategoryService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.CreateCategoryWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity<String> addHotelRoomsCategory(CreateCategoryWrapper requestMap) {
        try {
            if (validateSaveNewHotelRoomCategoryMap(requestMap)) {
                Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
                if (authentication == null || !authentication.isAuthenticated()) {
                    return HotelUtils.getResponse("Unauthorized access", HttpStatus.UNAUTHORIZED);
                }

                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                Integer userId = userPrincipal.getId();
                hotelRoomCategoryDao.save(mapSaveRoomCategory(requestMap, userId));
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.CREATED);
            } else {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in HotelRoomCategoryServiceImpl {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
    public ResponseEntity<String> updateHotelRoomsCategory(CreateCategoryWrapper requestMap) {
        try{
            if(validateUpdateNewHotelRoomCategoryMap(requestMap)){
                Integer id = requestMap.getId();
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

    private boolean validateSaveNewHotelRoomCategoryMap(CreateCategoryWrapper requestMap) {
        return requestMap.getRoomCategoryType() != null && !requestMap.getRoomCategoryType().isEmpty()
                && requestMap.getDescription() != null && !requestMap.getDescription().isEmpty();
    }

    private boolean validateUpdateNewHotelRoomCategoryMap(CreateCategoryWrapper requestMap) {
        return  requestMap.getId() != null &&
                requestMap.getRoomCategoryType() != null && !requestMap.getRoomCategoryType().isEmpty()
                && requestMap.getDescription() != null && !requestMap.getDescription().isEmpty();
    }


    private RoomCategory mapUpdateRoomCategory(CreateCategoryWrapper requestMap,RoomCategory category){
        category.setRoomCategoryType(requestMap.getRoomCategoryType());
        category.setDescription(requestMap.getDescription());
        return category;
    }

    private RoomCategory mapSaveRoomCategory(CreateCategoryWrapper requestMap,Integer userId) {
        RoomCategory roomCategory = new RoomCategory();
        User user = new User();
        user.setId(userId);
        roomCategory.setCreatedBy(user);
        roomCategory.setRoomCategoryType(requestMap.getRoomCategoryType());
        roomCategory.setDescription(requestMap.getDescription());
        roomCategory.setStatus(true);
        return roomCategory;
    }


}
