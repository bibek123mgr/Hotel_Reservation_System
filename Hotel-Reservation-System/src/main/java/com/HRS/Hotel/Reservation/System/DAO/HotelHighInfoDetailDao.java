package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.HotelHighInfoDetail;
import com.HRS.Hotel.Reservation.System.wrapper.GetAllActiveHotelsWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.HotelListWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelHighInfoDetailDao extends JpaRepository<HotelHighInfoDetail,Integer> {


}
