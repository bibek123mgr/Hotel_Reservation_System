package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.wrapper.CreateSubscriptionWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

public interface SubscriptionPlanService {

    public ResponseEntity<String> addSubscriptionPlan(@RequestBody(required = true) CreateSubscriptionWrapper requestMap);

    public ResponseEntity<String> updateSubscriptionPlan(@RequestBody(required = true) CreateSubscriptionWrapper requestMap);

    ResponseEntity<String> deleteSubscriptionPlan(Integer subscriptionPlanId);

    ResponseEntity<List<CreateSubscriptionWrapper>> fetchSubscriptionPlan();

//    ResponseEntity<String> getAllSubscriptionPlan();
}
