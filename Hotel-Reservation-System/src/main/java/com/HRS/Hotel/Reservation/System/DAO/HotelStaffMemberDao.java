package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.HotelStaffMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HotelStaffMemberDao extends JpaRepository<HotelStaffMember,Integer> {
}
