package com.HRS.Hotel.Reservation.System.restImpl;


import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.HotelRest;
import com.HRS.Hotel.Reservation.System.service.HotelService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.*;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class HotelRestImpl implements HotelRest {

    private static final Logger logger= LoggerFactory.getLogger(HotelRestImpl.class);

    @Autowired
    private HotelService hotelService;


    @Override
    public ResponseEntity<String> addHotel(HotelCreateRequestWrapper hotelCreateRequestWrapper, MultipartFile imageFile) {
        try{
            return hotelService.addHotel(hotelCreateRequestWrapper,imageFile);
       }catch (Exception e){
           logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
       }
       return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateHotelProfile(HotelUpdateRequestWrapper hotelUpdateRequestWrapper) {
        try{
            return hotelService.updateHotelProfile(hotelUpdateRequestWrapper);
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);    }

    @Override
    public ResponseEntity<String> updateHotelProfileImage(MultipartFile imageFile,Integer id) {
        try{
            return hotelService.updateHotelProfileImage(imageFile,id);
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> signIn(HotelSignInRequestWrapper hotelSignInRequestWrapper, HttpServletResponse response) {
        try{
            return hotelService.signIn(hotelSignInRequestWrapper,response);
        } catch (Exception e) {
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> verifySubscriptionKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper) {
        try{
            return hotelService.verifySubscriptionKhaltiPaymet(khaltiPaymentVerifyRequestWrapper);
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableHotels(Map<String, String> queryParams) {
        try{
            return hotelService.getAllAvailableHotels(queryParams);
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<GetAllActiveHotelsWrapper>> getAllAvailableHotelsForLoginPage() {
        try{
            return hotelService.getAllAvailableHotelsForLoginPage();
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<Hotel> getHotelProfile() {
        try{
            return hotelService.getHotelProfile();
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new Hotel(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<HotelListWrapper>> getAllAvailableNearByHotels(HotelNearByRequestWrapper requestQuery) {
        try{
            return hotelService.getAllAvailableNearByHotels(requestQuery);
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<DashboardSummeryResponseWrapper> getDashboardSummery() {
        try{
            return hotelService.getDashboardSummery();
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new DashboardSummeryResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<PaymentSummeryResponse> getPaymentSummery() {
        try{
            return hotelService.getPaymentSummery();
        }catch (Exception e){
            logger.error("Error occurred in HotelRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new PaymentSummeryResponse(), HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
