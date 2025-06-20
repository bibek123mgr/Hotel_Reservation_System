package com.HRS.Hotel.Reservation.System.seeder;

import com.HRS.Hotel.Reservation.System.DAO.UserDao;
import com.HRS.Hotel.Reservation.System.POJO.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserDao userRepo;

    @Autowired
    private PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {
        if(userRepo.count() == 0){
            userRepo.save(mapSeedUser());
            log.info("Admin Seed Successfully.");
        }else{
            log.info("Admin Already Seed.");
        }
    }

    private User mapSeedUser(){
        User user=new User();
        user.setFirstName("super");
        user.setLastName("admin");
        user.setEmail("admin@gmail.com");
        user.setPassword(encoder.encode("Admin@admin123"));
        user.setRole("super admin");
        user.setStatus(true);
        return user;
    }
}
