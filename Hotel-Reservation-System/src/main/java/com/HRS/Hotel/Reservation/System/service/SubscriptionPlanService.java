package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface SubscriptionPlanService {

    public ResponseEntity<String> addSubscriptionPlan(@RequestBody(required = true) Map<String,String> requestMap);

    public ResponseEntity<String> updateSubscriptionPlan(@RequestBody(required = true)Map<String,String> requestMap);

    ResponseEntity<String> deleteSubscriptionPlan(Integer subscriptionPlanId);

    ResponseEntity<List<SubscriptionPlan>> fetchSubscriptionPlan();

//    ResponseEntity<String> getAllSubscriptionPlan();
}
