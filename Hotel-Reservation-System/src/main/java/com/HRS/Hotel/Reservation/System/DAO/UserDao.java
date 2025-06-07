package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@Repository
public interface UserDao extends JpaRepository<User,Integer> {
    User findByEmailId(@RequestParam("email") String email);

    @Query(name = "UserDao.getAllActiveUsers")
    List<UserResponseWrapper> getAllActiveUsers();

    @Query(name = "UserDao.getUserProfile")
    UserResponseWrapper getUserProfile(@Param("userId") Integer userId);
}
