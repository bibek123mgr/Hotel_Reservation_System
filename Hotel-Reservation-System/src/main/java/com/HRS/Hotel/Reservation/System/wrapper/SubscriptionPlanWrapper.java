package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class SubscriptionPlanWrapper {
    private Integer id;
    private String name;
    private String description;
    private String features;
    private Integer duration;
    private Double price;
    private LocalDateTime createdAt;

    public SubscriptionPlanWrapper(){}

    public SubscriptionPlanWrapper(Integer id, String name, String description, String features, Integer duration, Double price, LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.features = features;
        this.duration = duration;
        this.price = price;
        this.createdAt = createdAt;
    }

}
