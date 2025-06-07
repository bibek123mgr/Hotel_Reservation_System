package com.HRS.Hotel.Reservation.System.POJO;

import com.HRS.Hotel.Reservation.System.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "subscription_payments")
@EntityListeners(AuditingEntityListener.class)

@NamedQuery(
        name = "SubscriptionPayment.findByKhaltiPidx",
        query = "SELECT p FROM SubscriptionPayment p WHERE p.transactionId = :pidx AND " +
                "p.paymentMethod = com.HRS.Hotel.Reservation.System.enums.PaymentMethod.KHALTI " +
                "AND p.status = true"
)

public class SubscriptionPayment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_plan_id", nullable = false)
    private SubscriptionPlan subscriptionPlan;

    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;

    private Integer subscriptionDuration;

    private String subscriptionType;

    private String transactionId;

    private String paymentStatus;

    private Double amount;

    private Boolean status;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
