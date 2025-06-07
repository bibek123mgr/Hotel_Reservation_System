package com.HRS.Hotel.Reservation.System.rest;


import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1/subscription-plans")
public interface SubscriptionPlanRest {

    @PostMapping
    public ResponseEntity<String> addSubscriptionPlan(@RequestBody(required = true)Map<String,String> requestMap);

    @PutMapping
    public ResponseEntity<String> updateSubscriptionPlan(@RequestBody(required = true)Map<String,String> requestMap);

    @GetMapping
    public ResponseEntity<List<SubscriptionPlan>> fetchSubscriptionPlan();


    @DeleteMapping("/{subscriptionPlanId}")
    public ResponseEntity<String> deleteSubscriptionPlan(@PathVariable Integer subscriptionPlanId);


}
