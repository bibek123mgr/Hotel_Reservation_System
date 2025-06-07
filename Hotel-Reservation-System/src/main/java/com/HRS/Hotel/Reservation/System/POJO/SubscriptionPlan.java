package com.HRS.Hotel.Reservation.System.POJO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@DynamicUpdate
@DynamicInsert
@Table(name="subscription_plans")
@EntityListeners(AuditingEntityListener.class)
@NamedQuery(name = "SubscriptionPlan.findBySubscriptionPlanName",query = "SELECT sp FROM SubscriptionPlan sp WHERE sp.name=:name AND sp.status=true")

public class SubscriptionPlan implements Serializable {

  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Integer id;

  private String name;

  private Double monthlyPrice;
  private Double yearlyPrice;

  private Double monthlyOfferPercentage;
  private Double yearlyOfferPercentage;

  private Double discountedMonthlyPrice;
  private Double discountedYearlyPrice;

  private String description;
  private String features;
  private Boolean status;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "created_by")
  private User createdBy;

  @CreatedDate
  private LocalDateTime createdAt;

  @LastModifiedDate
  private LocalDateTime updatedAt;
}
