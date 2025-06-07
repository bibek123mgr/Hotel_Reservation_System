package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.POJO.Room;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.rest.ReservationRest;
import com.HRS.Hotel.Reservation.System.service.ReservationService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.KhaltiPaymentVerifyRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ReservationRestImpl implements ReservationRest {

    private static final Logger logger= LoggerFactory.getLogger(ReservationRestImpl.class);

    @Autowired
    private ReservationService reservationService;

    @Override
    public ResponseEntity<String> createReservation(ReservationRequestWrapper reservationRequestWrapper) {
       try{
            return reservationService.createReservation(reservationRequestWrapper);
       } catch (Exception e) {
           logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
       }
       return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservation() {
        try{
            return reservationService.getAllReservation();
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<ReservationResponseWrapper> getReservation(Integer id) {
        try{
            return reservationService.getReservation(id);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ReservationResponseWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);    }

    @Override
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservationHotel() {
        try{
            return reservationService.getAllReservationHotel();
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ReservationResponseWrapper>> getAllUserReservation(Integer userId) {
        try{
            return reservationService.getAllUserReservation(userId);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateReservationStatus(Integer id, ReservationStatus status) {
        try{
            return reservationService.updateReservationStatus(id,status);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> verifyReservationKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper) {
        try{
            return reservationService.verifyReservationKhaltiPaymet(khaltiPaymentVerifyRequestWrapper);
        } catch (Exception e) {
            logger.error("Error Occurred at ReservationRestImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
