package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "promotion_plan")
@EntityListeners(AuditingEntityListener.class)

@NamedQueries({
        @NamedQuery(name = "PromotionPlan.updatePromotionPlan",
                query = "UPDATE PromotionPlan p SET p.title = :title, p.affectedFrom = :affectedFrom, p.affectedTo = :affectedTo WHERE p.id = :id"),
        @NamedQuery(name = "PromotionPlan.updateStatusById",
                query = "UPDATE PromotionPlan p SET p.status = false WHERE p.id = :id")
})
public class PromotionPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;

    @JoinColumn(name = "image_url")
    @OneToOne(fetch = FetchType.LAZY)
    private MediaFile imageUrl;

    private LocalDateTime affectedFrom;
    private LocalDateTime affectedTo;

    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
