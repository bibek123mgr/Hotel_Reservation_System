package com.HRS.Hotel.Reservation.System.rest;


import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.wrapper.CreateSubscriptionWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/v1/")
public interface SubscriptionPlanRest {

    @PostMapping("admin/subscription-plans")
    public ResponseEntity<String> addSubscriptionPlan(@RequestBody(required = true) CreateSubscriptionWrapper requestMap);

    @PutMapping("admin/subscription-plans")
    public ResponseEntity<String> updateSubscriptionPlan(@RequestBody(required = true) CreateSubscriptionWrapper requestMap);

    @GetMapping("subscription-plans")
    public ResponseEntity<List<CreateSubscriptionWrapper>> fetchSubscriptionPlan();


    @DeleteMapping("admin/subscription-plans/{subscriptionPlanId}")
    public ResponseEntity<String> deleteSubscriptionPlan(@PathVariable Integer subscriptionPlanId);


}
