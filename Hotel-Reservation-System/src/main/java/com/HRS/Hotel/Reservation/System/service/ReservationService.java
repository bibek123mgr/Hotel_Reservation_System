package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.wrapper.KhaltiPaymentVerifyRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReservationService {
    ResponseEntity<String> createReservation(ReservationRequestWrapper reservationRequestWrapper);

    ResponseEntity<List<ReservationResponseWrapper>> getAllUserReservation(Integer userId);

    ResponseEntity<List<ReservationResponseWrapper>> getAllReservation();

    ResponseEntity<String> updateReservationStatus(Integer id, ReservationStatus status);

    ResponseEntity<String> verifyReservationKhaltiPaymet(KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper);

    ResponseEntity<List<ReservationResponseWrapper>> getAllReservationHotel();

    ResponseEntity<ReservationResponseWrapper> getReservation(Integer id);
}
