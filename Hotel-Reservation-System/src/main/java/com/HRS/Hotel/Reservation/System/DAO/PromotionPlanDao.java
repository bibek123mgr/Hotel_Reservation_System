package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.PromotionPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Repository
public interface PromotionPlanDao extends JpaRepository<PromotionPlan,Integer> {

    @Transactional
    @Modifying
    @Query("UPDATE PromotionPlan p SET p.title = :title, p.affectedFrom = :affectedFrom, p.affectedTo = :affectedTo WHERE p.id = :id")
    void updatePromotionPlan(@Param("title") String title,
                             @Param("affectedFrom") LocalDateTime affectedFrom,
                             @Param("affectedTo") LocalDateTime affectedTo,
                             @Param("id") Integer id);

    @Transactional
    @Modifying
    @Query("UPDATE PromotionPlan p SET p.status = false WHERE p.id = :id")
    void updateStatusById(@Param("id") Integer id);
}
