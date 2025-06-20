package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreateSubscriptionWrapper {
    private Integer id;
    private String name;
    private String features;
    private String description;
    private Double monthlyPrice;
    private Double yearlyPrice;


    public CreateSubscriptionWrapper(Integer id, String name, String features, String description, Double monthlyPrice, Double yearlyPrice) {
        this.id = id;
        this.name = name;
        this.features = features;
        this.description = description;
        this.monthlyPrice = monthlyPrice;
        this.yearlyPrice = yearlyPrice;
    }
}
