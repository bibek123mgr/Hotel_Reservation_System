package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.wrapper.PurchaseRequestWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/purchases")
public interface PurchaseRest {

    ResponseEntity<String> createPurchase(@RequestBody PurchaseRequestWrapper reqBody);
}
