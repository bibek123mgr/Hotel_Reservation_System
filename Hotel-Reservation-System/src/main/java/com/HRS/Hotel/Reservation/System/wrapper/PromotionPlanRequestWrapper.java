package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PromotionPlanRequestWrapper {

    private String title;
    private LocalDateTime affectedFrom;
    private LocalDateTime affectedTo;
}
