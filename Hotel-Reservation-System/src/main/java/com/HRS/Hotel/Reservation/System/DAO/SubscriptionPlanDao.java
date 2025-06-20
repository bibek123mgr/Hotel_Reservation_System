package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import com.HRS.Hotel.Reservation.System.wrapper.CreateSubscriptionWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubscriptionPlanDao extends JpaRepository<SubscriptionPlan,Integer> {
    SubscriptionPlan findBySubscriptionPlanName(@Param("name") String name);

    @Query(name = "SubscriptionPlan.getAllActiveSubscriptionPlans")
    List<CreateSubscriptionWrapper> getAllActiveSubscriptionPlans();
}
