package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.PurchaseRest;
import com.HRS.Hotel.Reservation.System.service.PurchaseService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.PurchaseRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PurchaseRestImpl implements PurchaseRest {

    private static final Logger logger= LoggerFactory.getLogger(PurchaseRestImpl.class);

    @Autowired
    private PurchaseService purchaseService;

    @Override
    public ResponseEntity<String> createPurchase(PurchaseRequestWrapper reqBody) {
      try{
            return  purchaseService.createPurchase(reqBody);
      } catch (Exception e) {
          logger.error("Error Occurred at PurchaseRestImpl {}",e.getMessage(),e);
      }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);

    }
}
