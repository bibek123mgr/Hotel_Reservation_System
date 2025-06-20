package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.Room;
import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper;
import jakarta.persistence.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoomDao extends JpaRepository<Room,Integer> {

    @Query(name = "RoomDao.getAllSpecificHotelRoom")
    List<RoomResponseWrapper> getAllSpecificHotelRoom(@Param("roomCategoryId") Integer roomCategoryId);

    @Query(name = "RoomDao.getAllHotelRoom")
    List<RoomResponseWrapper> getAllHotelRoom();

    @Query(name = "RoomDao.getRoomsByHotelId")
    List<RoomResponseWrapper> getRoomsByHotelId(@Param("hotelId") Integer hotelId);


    @Query(name = "RoomDao.getAllSpecificHotelRoomForPublic")
    List<RoomResponseWrapper> getAllSpecificHotelRoomForPublic(@Param("hotelId") Integer hotelId);

    @Query(name = "RoomDao.getAllHotelRoomForPublic")
    List<RoomResponseWrapper> getAllHotelRoomForPublic();

    @Query(name = "RoomDao.getHotelRoomDetailForPublic")
    RoomResponseWrapper getHotelRoomDetailForPublic(@Param("hotelId") Integer hotelId,@Param("roomCategoryId") Integer roomCategoryId);

    List<Room> findByStatusAndRoomStatusAndRoomCategoryIdAndHotelId(
            Boolean status, RoomStatus roomStatus, Integer categoryId, Integer hotelId);

    @Query(name = "RoomDao.getCountRoomOfHotel")
    Integer getCountRoomOfHotel(@Param("hotelId") Integer hotelId);

    @Query(name = "RoomDao.getCountRoom")
    Integer getCountRoom();


}
