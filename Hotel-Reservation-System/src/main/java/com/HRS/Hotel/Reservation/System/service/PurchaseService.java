package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.PurchaseRequestWrapper;
import org.springframework.http.ResponseEntity;

public interface PurchaseService {
    ResponseEntity<String> createPurchase(PurchaseRequestWrapper reqBody);
}
