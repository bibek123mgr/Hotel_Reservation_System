package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class PurchaseRequestWrapper {
    private Integer hotelId;
    private Integer hotelHighInfoDetail;
    private Integer stockInQty;
    private BigDecimal rate;
    private BigDecimal amount;
    private List<PurchaseItemsWrapper> items;
    private Boolean stockLimitApplied;
    private Integer created_by;
}
