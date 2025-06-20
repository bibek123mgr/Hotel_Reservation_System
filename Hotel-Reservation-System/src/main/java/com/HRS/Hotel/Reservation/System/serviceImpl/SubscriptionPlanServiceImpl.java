package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.SubscriptionPlanDao;
import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.SubscriptionPlanService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.CreateSubscriptionWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity<String> addSubscriptionPlan(CreateSubscriptionWrapper requestMap) {
        try{
           if(validateAddSubscriptionPlanMap(requestMap)){
               Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
               if (authentication == null || !authentication.isAuthenticated()) {
                   return HotelUtils.getResponse("Unauthorized access", HttpStatus.UNAUTHORIZED);
               }
               System.out.println("i am auth"+authentication.getPrincipal() );
               UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

               Integer userId = userPrincipal.getId();
               com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan subscriptionPlan=subscriptionPlanDao.findBySubscriptionPlanName(requestMap.getName());
               if(Objects.isNull(subscriptionPlan)){
                   subscriptionPlanDao.save(getSubscriptionPlanFromMap(requestMap,userId));
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

    private com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan getSubscriptionPlanFromMap(CreateSubscriptionWrapper requestMap,Integer userId){
        com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan subscriptionPlan=new com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan();
        subscriptionPlan.setName(requestMap.getName());
        subscriptionPlan.setFeatures(requestMap.getFeatures());
        subscriptionPlan.setDescription(requestMap.getDescription());

        subscriptionPlan.setMonthlyPrice(requestMap.getMonthlyPrice());
        subscriptionPlan.setYearlyPrice(requestMap.getYearlyPrice());

        User user = new User();
        user.setId(userId);
        subscriptionPlan.setCreatedBy(user);

        subscriptionPlan.setStatus(true);

        return subscriptionPlan;
    }

    private boolean validateAddSubscriptionPlanMap(CreateSubscriptionWrapper requestMap) {
        return requestMap.getName() != null && !requestMap.getName().trim().isEmpty()
                && requestMap.getFeatures() != null && !requestMap.getFeatures().isEmpty()
                && requestMap.getDescription() != null && !requestMap.getDescription().trim().isEmpty()
                && requestMap.getMonthlyPrice() != null
                && requestMap.getYearlyPrice() != null;
    }
    @Override
    public ResponseEntity<String> updateSubscriptionPlan(CreateSubscriptionWrapper requestMap) {
        try{
            if(validateUpdateSubscriptionPlanMap(requestMap)) {
                Optional<SubscriptionPlan> subscriptionPlan=subscriptionPlanDao.findById(requestMap.getId());
                if(subscriptionPlan.isPresent()){
                    subscriptionPlanDao.save(mapSubscriptionPlanFromMap(requestMap,subscriptionPlan.get()));
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
                }else{
                    return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
                }
            }else {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA,HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private SubscriptionPlan mapSubscriptionPlanFromMap(CreateSubscriptionWrapper requestMap,SubscriptionPlan subscriptionPlan){
        subscriptionPlan.setName(requestMap.getName());
        subscriptionPlan.setFeatures(requestMap.getFeatures());
        subscriptionPlan.setDescription(requestMap.getDescription());
        subscriptionPlan.setMonthlyPrice(requestMap.getMonthlyPrice());
        subscriptionPlan.setYearlyPrice(requestMap.getYearlyPrice());
        return subscriptionPlan;
    }


    private boolean validateUpdateSubscriptionPlanMap(CreateSubscriptionWrapper requestMap) {
        return  requestMap.getId() != null &&requestMap.getName() != null && !requestMap.getName().trim().isEmpty()
                && requestMap.getFeatures() != null && !requestMap.getFeatures().isEmpty()
                && requestMap.getDescription() != null && !requestMap.getDescription().trim().isEmpty()
                && requestMap.getMonthlyPrice() != null
                && requestMap.getYearlyPrice() != null;
    }

    @Override
    public ResponseEntity<String> deleteSubscriptionPlan(Integer subscriptionPlanId) {
        try{
            Optional<SubscriptionPlan> subscriptionPlan=subscriptionPlanDao.findById(subscriptionPlanId);
            if(subscriptionPlan.isPresent()){
                SubscriptionPlan plan=subscriptionPlan.get();
                plan.setStatus(false);
                subscriptionPlanDao.save(plan);
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
    public ResponseEntity<List<CreateSubscriptionWrapper>> fetchSubscriptionPlan() {
        try{
            List<CreateSubscriptionWrapper> subscriptionPlan=subscriptionPlanDao.getAllActiveSubscriptionPlans();
            return new ResponseEntity<>(subscriptionPlan,HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in SubscriptionPlanServiceImpl :{}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
