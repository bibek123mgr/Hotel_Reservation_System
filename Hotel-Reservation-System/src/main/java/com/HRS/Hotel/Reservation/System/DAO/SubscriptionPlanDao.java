package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SubscriptionPlanDao extends JpaRepository<SubscriptionPlan,Integer> {
    SubscriptionPlan findBySubscriptionPlanName(@Param("name") String name);
}
