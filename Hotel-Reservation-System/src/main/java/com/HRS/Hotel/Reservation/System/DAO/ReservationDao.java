package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.Reservation;
import com.HRS.Hotel.Reservation.System.POJO.Room;
import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.wrapper.ReservationResponseWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import jakarta.persistence.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservationDao extends JpaRepository<Reservation,Integer> {

    @Transactional
    @Modifying
    @Query(name = "ReservationDao.getAllUserReservation")
    List<ReservationResponseWrapper> getAllUserReservation(@Param("userId") Integer userId);


    @Transactional
    @Modifying
    @Query(name = "ReservationDao.getAllReservation")
    List<ReservationResponseWrapper> getAllReservation();


    @Query(name = "ReservationDao.getAllReservationHotel")
    List<ReservationResponseWrapper> getAllReservationHotel(@Param("hotelId") Integer hotelId);

    @Transactional
    @Modifying
    @Query(name = "ReservationDao.updateReservationStatus")
    void updateReservationStatus(
                                @Param("reservationStatus") ReservationStatus reservationStatus,
                                @Param("id") Integer id);

    @Query(name = "ReservationDao.existsActiveReservationBetweenDates")
    boolean existsActiveReservationBetweenDates(@Param("roomId") Integer roomId,
                                                @Param("checkInDate") LocalDateTime checkInDate,
                                                @Param("checkOutDate") LocalDateTime checkOutDate,
                                                 @Param("statuses") List<ReservationStatus> statuses);


    @Query(name = "ReservationDao.findReservationByPaymentId")
    Reservation findReservationByPaymentId(@Param("paymentId") Integer paymentId);

    Optional<Reservation> findFirstByRoomAndReservationStatusIn(Room room, List<ReservationStatus> reservationStatuses);

    List<Reservation> findByReservationStatusInAndStatusTrueAndCheckOutDateBefore(
            List<ReservationStatus> statuses,
            LocalDateTime checkOutDate);

    @Query(name = "ReservationDao.getAllActiveUsersByHotel")
    List<UserResponseWrapper> getAllActiveUsersByHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "ReservationDao.getReservationCountOfHotel")
    Integer getReservationCountOfHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "ReservationDao.getReservationCount")
    Integer getReservationCount();

    @Query(name = "ReservationDao.getTodaysReservationsByHotel")
    Integer getTodaysReservationsByHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "ReservationDao.getTodaysReservations")
    Integer getTodaysReservations();

    @Query(name = "ReservationDao.countTodaysCheckInsByHotel")
    Integer countTodaysCheckInsByHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "ReservationDao.countTodaysCheckIns")
    Integer countTodaysCheckIns();

    @Query(name = "ReservationDao.countTodaysCheckOutsByHotel")
    Integer countTodaysCheckOutsByHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "ReservationDao.countTodaysCheckOuts")
    Integer countTodaysCheckOuts();

    @Query(name = "ReservationDao.getReservation")
    ReservationResponseWrapper getReservation(Integer id);
}



