package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.wrapper.GetAllActiveHotelsWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.HotelListWrapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Repository
public interface HotelDao extends JpaRepository<Hotel,Integer> {

    @Query(name = "HotelDao.findByUserId")
    Hotel findByUserId(@Param("userId") Integer userId,@Param("code") Integer code);

    @Query(name = "HotelDao.findByUserIdOnly")
    Hotel findByUserIdOnly(@Param("userId") Integer userId);

    @Query(name = "HotelDao.findAllActiveHotel")
    List<GetAllActiveHotelsWrapper> findAllActiveHotel();

    @Query(name = "HotelDao.findAvailableHotelsWithFilters")
    List<HotelListWrapper> findAvailableHotelsWithFilters();

    @Query(name = "HotelDao.findAvailableHotelsNearByWithFilters")
    List<HotelListWrapper> findAvailableHotelsNearByWithFilters(Double latitude, Double longitude, Integer radius);


}
