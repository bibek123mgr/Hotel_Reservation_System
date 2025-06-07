package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.OtpVerification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

@Repository
public interface OtpVerificationDao extends JpaRepository<OtpVerification,Integer> {

    OtpVerification userFindByUserId(@RequestParam("userid") Integer userid);
}
