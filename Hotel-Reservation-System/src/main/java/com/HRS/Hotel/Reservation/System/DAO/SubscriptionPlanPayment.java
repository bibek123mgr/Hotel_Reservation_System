package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubscriptionPlanPayment extends JpaRepository<SubscriptionPayment,Integer> {


    SubscriptionPayment findByKhaltiPidx(@Param("pidx") String pidx);


}
