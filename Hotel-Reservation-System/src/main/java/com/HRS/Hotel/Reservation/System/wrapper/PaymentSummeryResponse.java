package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentSummeryResponse {

    private Double totalAmount;
    private Double paidAmount;
    private Double remainingAmount;

    public PaymentSummeryResponse(Double totalAmount, Double paidAmount, Double remainingAmount) {
        this.totalAmount = totalAmount;
        this.paidAmount = paidAmount;
        this.remainingAmount = remainingAmount;
    }
}
