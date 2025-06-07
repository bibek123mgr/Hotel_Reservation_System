package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.PromotionPlanRequestWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface PromotionPlanService {
    ResponseEntity<String> createPromotionPlan(PromotionPlanRequestWrapper requestBody, MultipartFile file);

    ResponseEntity<String> updatePromotionPlan(PromotionPlanRequestWrapper requestBody, Integer id);

    ResponseEntity<String> removePromotionPlan(Integer id);
}
