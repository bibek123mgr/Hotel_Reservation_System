package com.HRS.Hotel.Reservation.System.POJO;

import com.HRS.Hotel.Reservation.System.enums.PaymentMethod;
import com.HRS.Hotel.Reservation.System.enums.PaymentStatus;
import com.HRS.Hotel.Reservation.System.enums.WalletType;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "payment")
@NamedQueries({
        @NamedQuery(
                name = "Payment.findByKhaltiPidx",
                query = "SELECT p FROM Payment p WHERE p.transactionId = :pidx AND " +
                        "p.paymentMethod = com.HRS.Hotel.Reservation.System.enums.PaymentMethod.KHALTI " +
                        "AND p.status = true"
        ),
        @NamedQuery(
                name = "PaymentDao.getAllHotelPaymentSummery",
                query = "SELECT new com.HRS.Hotel.Reservation.System.wrapper.PaymentSummeryResponse( " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_DEBIT " +
                        "THEN p.amount ELSE 0 END), 0), " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_CREDIT " +
                        "THEN p.amount ELSE 0 END), 0), " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_DEBIT " +
                        "AND p.paymentMethod = com.HRS.Hotel.Reservation.System.enums.PaymentMethod.KHALTI " +
                        "THEN p.amount ELSE 0 END), 0) - " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_DEBIT " +
                        "THEN p.amount ELSE 0 END), 0)) " +
                        "FROM Payment p"
        ),
        @NamedQuery(
                name = "PaymentDao.getHotelPaymentSummaryByHotelId",
                query = "SELECT new com.HRS.Hotel.Reservation.System.wrapper.PaymentSummeryResponse( " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_DEBIT " +
                        "THEN p.amount ELSE 0 END), 0), " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_CREDIT " +
                        "THEN p.amount ELSE 0 END), 0), " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_DEBIT " +
                        "AND p.paymentMethod = com.HRS.Hotel.Reservation.System.enums.PaymentMethod.KHALTI " +
                        "THEN p.amount ELSE 0 END), 0) - " +
                        "COALESCE(SUM(CASE WHEN p.status = true AND p.comesFrom = com.HRS.Hotel.Reservation.System.enums.WalletType.HOTEL_CREDIT " +
                        "THEN p.amount ELSE 0 END), 0)) " +
                        "FROM Payment p WHERE p.hotel.id = :hotelId"
        )
})
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true)
    private String transactionId;

    @Column(nullable = false)
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentStatus paymentStatus = PaymentStatus.PENDING;

    @Enumerated(EnumType.STRING)
    private WalletType comesFrom = WalletType.HOTEL_DEBIT;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", foreignKey = @ForeignKey(name = "FK_payment_room_id"))
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", foreignKey = @ForeignKey(name = "FK_payment_hotel_id"))
    private Hotel hotel;

    @CreationTimestamp
    @Column(updatable = false, nullable = false)
    private LocalDateTime paymentDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "FK_payment_created_by"))
    private User createdBy;

    private Boolean status = true;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
