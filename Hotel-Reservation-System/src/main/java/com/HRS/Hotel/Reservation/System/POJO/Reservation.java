package com.HRS.Hotel.Reservation.System.POJO;

import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "reservations")
@EntityListeners(AuditingEntityListener.class)
@NamedQueries({
        @NamedQuery(
                name = "ReservationDao.updateReservationStatus",
                query = "UPDATE Reservation r SET r.reservationStatus = :reservationStatus WHERE r.id = :id"
        ),
        @NamedQuery(
                name = "ReservationDao.existsActiveReservationBetweenDates",
                query = "SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END FROM Reservation r WHERE " +
                        "r.room.id = :roomId AND r.status = true AND r.reservationStatus IN (:statuses) " +
                        "AND (:checkInDate < r.checkOutDate AND :checkOutDate > r.checkInDate)"
        ),
        @NamedQuery(
                name = "ReservationDao.findReservationByPaymentId",
                query = "SELECT r FROM Reservation r WHERE r.payment.id = :paymentId AND r.status = true"
        ),
        @NamedQuery(
                name = "ReservationDao.getAllUserReservation",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper(" +
                        "r.id, " +
                        "r.bookedBy.id, " +
                        "CONCAT(r.bookedBy.firstName, ' ', r.bookedBy.lastName), " +
                        "r.bookedBy.email, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.room.id, " +
                        "r.room.roomNumber, " +
                        "r.reservationStatus, " +
                        "r.price, " +
                        "r.numberOfGuests, " +
                        "r.checkInDate, " +
                        "r.checkOutDate, " +
                        "r.createdAt) " +
                        "FROM Reservation r " +
                        "WHERE r.bookedBy.id = :userId"
        ),
        @NamedQuery(
                name = "ReservationDao.getAllReservation",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper(" +
                        "r.id, " +
                        "r.createdBy.id, " +
                        "CONCAT(r.createdBy.firstName, ' ', r.createdBy.lastName), " +
                        "r.createdBy.email, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.room.id, " +
                        "r.room.roomNumber, " +
                        "r.reservationStatus, " +
                        "r.price, " +
                        "r.numberOfGuests, " +
                        "r.checkInDate, " +
                        "r.checkOutDate, " +
                        "r.createdAt) " +
                        "FROM Reservation r"
        ), @NamedQuery(
        name = "ReservationDao.getReservation",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper(" +
                "r.id, " +
                "r.createdBy.id, " +
                "CONCAT(r.createdBy.firstName, ' ', r.createdBy.lastName), " +
                "r.createdBy.email, " +
                "r.hotel.id, " +
                "r.hotel.hotelName, " +
                "r.roomCategory.id, " +
                "r.roomCategory.roomCategoryType, " +
                "r.room.id, " +
                "r.room.roomNumber, " +
                "r.reservationStatus, " +
                "r.price, " +
                "r.numberOfGuests, " +
                "r.checkInDate, " +
                "r.checkOutDate, " +
                "r.createdAt) " +
                "FROM Reservation r WHERE id=:id"
),
        @NamedQuery(
                name = "ReservationDao.getAllReservationHotel",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper(" +
                        "r.id, " +
                        "r.createdBy.id, " +
                        "CONCAT(r.createdBy.firstName, ' ', r.createdBy.lastName), " +
                        "r.createdBy.email, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.room.id, " +
                        "r.room.roomNumber, " +
                        "r.reservationStatus, " +
                        "r.price, " +
                        "r.numberOfGuests, " +
                        "r.checkInDate, " +
                        "r.checkOutDate, " +
                        "r.createdAt) " +
                        "FROM Reservation r " +
                        "WHERE r.hotel.id = :hotelId"
        ),
        @NamedQuery(
                name = "ReservationDao.getAllActiveUsersByHotel",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper(" +
                        "u.id, CONCAT(u.firstName, ' ', u.lastName), u.email, u.role) " +
                        "FROM Reservation r " +
                        "JOIN r.bookedBy u " +
                        "WHERE u.status = true AND r.hotel.id = :hotelId  " +
                        "GROUP BY u.id"
        ),

        @NamedQuery(
                name = "ReservationDao.getReservationCountOfHotel",
                query = "SELECT Count(r) FROM Reservation r WHERE r.status = true AND r.checkOutDate > CURRENT_TIMESTAMP AND r.hotel.id = :hotelId"
        ),
        @NamedQuery(
                name = "ReservationDao.getReservationCount",
                query = "SELECT COUNT(r) FROM Reservation r WHERE r.status = true AND r.checkOutDate > CURRENT_TIMESTAMP"
        ),
        @NamedQuery(
                name = "ReservationDao.getTodaysReservationsByHotel",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.createdAt) = CURRENT_DATE " +
                        "AND r.hotel.id = :hotelId"
        ),
        @NamedQuery(
                name = "ReservationDao.getTodaysReservations",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.createdAt) = CURRENT_DATE"
        ),
        @NamedQuery(
                name = "ReservationDao.countTodaysCheckIns",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.checkInDate) = CURRENT_DATE"
        ),
        @NamedQuery(
                name = "ReservationDao.countTodaysCheckInsByHotel",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.checkInDate) = CURRENT_DATE " +
                        "AND r.hotel.id = :hotelId"
        ),
        @NamedQuery(
                name = "ReservationDao.countTodaysCheckOutsByHotel",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.checkOutDate) = CURRENT_DATE " +
                        "AND r.hotel.id = :hotelId"
        ),
        @NamedQuery(
                name = "ReservationDao.countTodaysCheckOuts",
                query = "SELECT COUNT(r) FROM Reservation r " +
                        "WHERE r.status = true " +
                        "AND DATE(r.checkOutDate) = CURRENT_DATE"
        )





})
public class Reservation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, foreignKey = @ForeignKey(name = "FK_reservation_user"))
    private User bookedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false, foreignKey = @ForeignKey(name = "FK_reservation_hotel"))
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_category_id", nullable = false, foreignKey = @ForeignKey(name = "FK_reservation_room_category"))
    private RoomCategory roomCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", foreignKey = @ForeignKey(name = "FK_reservation_room"))
    private Room room;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ReservationStatus reservationStatus;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer numberOfGuests;

    @Column(nullable = false)
    private LocalDateTime checkInDate;

    @Column(nullable = false)
    private LocalDateTime checkOutDate;

    @Column(nullable = false)
    private boolean status = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_id", nullable = false, foreignKey = @ForeignKey(name = "FK_reservation_payment_id"))
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "FK_reservation_created_by"))
    private User createdBy;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
