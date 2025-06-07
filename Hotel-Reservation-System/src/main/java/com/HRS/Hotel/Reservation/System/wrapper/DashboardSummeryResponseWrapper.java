package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class DashboardSummeryResponseWrapper {

    private Integer occupancyRate;
    private Integer reservationCount;
    private Integer checkOutCount;
    private Integer checkInCount;


    public DashboardSummeryResponseWrapper(Integer checkInCount, Integer checkOutCount, Integer reservationCount, Integer occupancyRate) {
        this.checkInCount = checkInCount;
        this.checkOutCount = checkOutCount;
        this.reservationCount = reservationCount;
        this.occupancyRate = occupancyRate;
    }
}
