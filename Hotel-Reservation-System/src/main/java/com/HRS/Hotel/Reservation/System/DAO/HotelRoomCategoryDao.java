package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.RoomCategory;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelRoomCategoryDao extends JpaRepository<RoomCategory, Integer> {

    @Query(name = "RoomCategory.getAllRoomCategories")
    List<HotelRoomCategoryWrapper> getAllRoomCategories();

    @Query(name = "RoomCategory.getOneRoomCategories")
    HotelRoomCategoryWrapper getOneRoomCategories(@Param("id") Integer id);


}
