package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PurchaseItemsWrapper {

    private Integer menu;
    private Integer Qty;
    private BigDecimal rate;
    private BigDecimal amount;
}
