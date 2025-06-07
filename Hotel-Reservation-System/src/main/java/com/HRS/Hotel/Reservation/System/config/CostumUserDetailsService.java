//package com.HRS.Hotel.Reservation.System.config;
//
//import com.HRS.Hotel.Reservation.System.DAO.UserDao;
//import com.HRS.Hotel.Reservation.System.POJO.User;
//import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.Objects;
//
//@Service
//public class CostumUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private UserDao userDao;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user=userDao.findByEmailId(username);
//        if(Objects.isNull(user)){
//            throw new UsernameNotFoundException("User Not Found !!");
//        }else {
//            return new UserPrincipal(user);
//        }
//    }
//}

package com.HRS.Hotel.Reservation.System.config;

import com.HRS.Hotel.Reservation.System.DAO.HotelDao;
import com.HRS.Hotel.Reservation.System.DAO.UserDao;
import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CostumUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private HotelDao hotelDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByEmailId(username);

        if (Objects.isNull(user)) {
            throw new UsernameNotFoundException("User Not Found !!");
        }

        // Create UserPrincipal
        UserPrincipal userPrincipal = new UserPrincipal(user);

        // If hotel admin, set hotel ID
        if ("HOTEL_ADMIN".equalsIgnoreCase(user.getRole())) {
            Hotel hotel = hotelDao.findByUserIdOnly(user.getId());
            if (hotel != null) {
                userPrincipal.setHotelId(hotel.getId());
            }
        }

        return userPrincipal;
    }
}

