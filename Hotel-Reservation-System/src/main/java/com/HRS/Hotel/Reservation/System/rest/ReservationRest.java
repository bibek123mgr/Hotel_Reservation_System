package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.wrapper.KhaltiPaymentVerifyRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/reservations")
public interface ReservationRest {

    @PostMapping()
    public ResponseEntity<String> createReservation(@RequestBody(required = true) ReservationRequestWrapper reservationRequestWrapper);

    @GetMapping()
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservation();

    @GetMapping("/{id}")
    public ResponseEntity<ReservationResponseWrapper> getReservation(@PathVariable Integer id);

    @GetMapping("/hotels")
    public ResponseEntity<List<ReservationResponseWrapper>> getAllReservationHotel();

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationResponseWrapper>> getAllUserReservation(@PathVariable Integer userId);

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<String> updateReservationStatus(@PathVariable Integer id, @PathVariable ReservationStatus status);

    @PostMapping("/verify-khalti-payment")
    public ResponseEntity<String> verifyReservationKhaltiPaymet(@RequestBody KhaltiPaymentVerifyRequestWrapper khaltiPaymentVerifyRequestWrapper);

}
