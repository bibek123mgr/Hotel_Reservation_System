package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.PromotionPlanRest;
import com.HRS.Hotel.Reservation.System.service.PromotionPlanService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.PromotionPlanRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class PromotionPlanRestImpl implements PromotionPlanRest {

    private static final Logger logger= LoggerFactory.getLogger(PromotionPlanRestImpl.class);

    @Autowired
    private PromotionPlanService promotionPlanService;

    @Override
    public ResponseEntity<String> createPromotionPlan(PromotionPlanRequestWrapper requestBody, MultipartFile file) {
      try{
          return promotionPlanService.createPromotionPlan(requestBody,file);
      } catch (Exception e) {
          logger.error("Error occurred at PromotionPlanRestImpl {}",e.getMessage(),e);
      }
      return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePromotionPlan(PromotionPlanRequestWrapper requestBody, Integer id) {
        try{
            return promotionPlanService.updatePromotionPlan(requestBody,id);
        } catch (Exception e) {
            logger.error("Error occurred at PromotionPlanRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @Override
    public ResponseEntity<String> removePromotionPlan(Integer id) {
        try{
            return promotionPlanService.removePromotionPlan(id);
        } catch (Exception e) {
            logger.error("Error occurred at PromotionPlanRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
