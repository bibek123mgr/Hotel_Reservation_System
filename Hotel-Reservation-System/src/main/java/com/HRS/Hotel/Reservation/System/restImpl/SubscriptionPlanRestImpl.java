package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.SubscriptionPlanRest;
import com.HRS.Hotel.Reservation.System.service.SubscriptionPlanService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class SubscriptionPlanRestImpl implements SubscriptionPlanRest {

    private static final Logger logger= LoggerFactory.getLogger(SubscriptionPlanRestImpl.class);

    @Autowired
   private SubscriptionPlanService subscriptionPlanService;

    @Override
    public ResponseEntity<String> addSubscriptionPlan(Map<String, String> requestMap) {
        try{
            return subscriptionPlanService.addSubscriptionPlan(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanRestImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateSubscriptionPlan(Map<String, String> requestMap) {
        try{
            return subscriptionPlanService.updateSubscriptionPlan(requestMap);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanRestImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SubscriptionPlan>> fetchSubscriptionPlan() {
        try{
            return subscriptionPlanService.fetchSubscriptionPlan();
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanRestImpl :{}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteSubscriptionPlan(Integer subscriptionPlanId) {
        try{
            return subscriptionPlanService.deleteSubscriptionPlan(subscriptionPlanId);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanRestImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }


//    @Override
//    public ResponseEntity<String> getAllSubscriptionPlan() {
//        try{
//            return subscriptionPlanService.getAllSubscriptionPlan();
//        } catch (Exception e) {
//            logger.error("Error occurred in SubscriptionPlanRestImpl :{}",e.getMessage(),e);
//        }
//        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
//    }
}
