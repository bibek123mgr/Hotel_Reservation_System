package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.wrapper.PromotionPlanRequestWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/api/v1")
public interface PromotionPlanRest {

    @PostMapping("/promotion-plans")
    ResponseEntity<String> createPromotionPlan(@RequestPart("data") @Validated PromotionPlanRequestWrapper requestBody, @RequestPart("file") MultipartFile file);

    @PatchMapping("/promotion-plans/{id}")
    ResponseEntity<String> updatePromotionPlan(@RequestBody(required = true) PromotionPlanRequestWrapper requestBody, @PathVariable Integer id);

    @DeleteMapping("/promotion-plans/{id}")
    ResponseEntity<String> removePromotionPlan( @PathVariable Integer id);

}
