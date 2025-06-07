package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.SubscriptionPlanDao;
import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.SubscriptionPlanService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.*;

@Service
public class SubscriptionPlanServiceImpl implements SubscriptionPlanService {

    private static final Logger logger=LoggerFactory.getLogger(SubscriptionPlanServiceImpl.class);

    @Autowired
    private SubscriptionPlanDao subscriptionPlanDao;

    @Override
    public ResponseEntity<String> addSubscriptionPlan(Map<String, String> requestMap) {
        try{
           if(validateAddSubscriptionPlanMap(requestMap)){
               com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan subscriptionPlan=subscriptionPlanDao.findBySubscriptionPlanName(requestMap.get("name"));
               if(Objects.isNull(subscriptionPlan)){
                   subscriptionPlanDao.save(getSubscriptionPlanFromMap(requestMap));
                   return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED,HttpStatus.CREATED);
               }else{
                   return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
               }
           }else{
               return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
           }
        }catch(Exception e){
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan getSubscriptionPlanFromMap(Map<String,String> requestMap){
        com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan subscriptionPlan=new com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan();
        subscriptionPlan.setName(requestMap.get("name"));
        subscriptionPlan.setFeatures(requestMap.get("features"));
        subscriptionPlan.setDescription(requestMap.get("description"));

        subscriptionPlan.setMonthlyPrice(Double.parseDouble(requestMap.get("monthlyPrice")));
        subscriptionPlan.setYearlyPrice(Double.parseDouble(requestMap.get("yearlyPrice")));

        subscriptionPlan.setMonthlyOfferPercentage(Double.parseDouble(requestMap.getOrDefault("monthlyOfferPercentage", "0")));
        subscriptionPlan.setYearlyOfferPercentage(Double.parseDouble(requestMap.getOrDefault("yearlyOfferPercentage", "0")));

        subscriptionPlan.setDiscountedMonthlyPrice(Double.parseDouble(requestMap.getOrDefault("discountedMonthlyPrice", "0")));
        subscriptionPlan.setDiscountedYearlyPrice(Double.parseDouble(requestMap.getOrDefault("discountedYearlyPrice", "0")));

        User user = new User();
        user.setId(Integer.parseInt(requestMap.get("createdBy")));
        subscriptionPlan.setCreatedBy(user);

        Boolean status = Boolean.parseBoolean(requestMap.getOrDefault("status", "true"));
        subscriptionPlan.setStatus(status);

        return subscriptionPlan;
    }

    private boolean validateAddSubscriptionPlanMap(Map<String,String> requestMap){
        return requestMap.containsKey("name")
                && requestMap.containsKey("features")
                && requestMap.containsKey("description")
                && requestMap.containsKey("monthlyPrice")
                && requestMap.containsKey("createdBy")
                && requestMap.containsKey("yearlyPrice");
    }

    @Override
    public ResponseEntity<String> updateSubscriptionPlan(Map<String, String> requestMap) {
        try{
            subscriptionPlanDao.save(getSubscriptionPlanFromMap(requestMap));
            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED,HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteSubscriptionPlan(Integer subscriptionPlanId) {
        try{
            Optional<SubscriptionPlan> subscriptionPlan=subscriptionPlanDao.findById(subscriptionPlanId);
            if(subscriptionPlan.isPresent()){
                SubscriptionPlan plan=subscriptionPlan.get();
                plan.setStatus(false);
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_DELETED,HttpStatus.OK);
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SubscriptionPlan>> fetchSubscriptionPlan() {
        try{
            List<SubscriptionPlan> subscriptionPlan=subscriptionPlanDao.findAll();
            return new ResponseEntity<>(subscriptionPlan,HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

//    @Override
//    public ResponseEntity<String> getAllSubscriptionPlan() {
//        return null;
//    }
}
