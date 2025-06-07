package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class SalesRequestWrapper {

    private Integer hotelId;
    private Integer hotelHighInfoDetail;
    private Integer reservation;
    private Integer stockOutQty;
    private BigDecimal rate;
    private BigDecimal amount;
    private List<PurchaseItemsWrapper> items;
    private Integer created_by;
}
