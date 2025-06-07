package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.Payment;
import com.HRS.Hotel.Reservation.System.enums.PaymentStatus;
import com.HRS.Hotel.Reservation.System.wrapper.PaymentSummeryResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentDao extends JpaRepository<Payment,Integer> {

    Payment findByKhaltiPidx(@Param("pidx") String pidx);

    List<Payment> findByPaymentStatusAndStatus(PaymentStatus paymentStatus, boolean status);

    @Query(name = "PaymentDao.getAllHotelPaymentSummery")
    PaymentSummeryResponse getAllHotelPaymentSummery();

    @Query(name = "PaymentDao.getHotelPaymentSummaryByHotelId")
    PaymentSummeryResponse getHotelPaymentSummaryByHotelId(@Param("hotelId") Integer hotelId);

}
