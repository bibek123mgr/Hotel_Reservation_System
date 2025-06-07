package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.repository.Query;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Collection;

@Entity
@Data
@Table(name = "users")


@NamedQuery(name = "User.findByEmailId", query = "SELECT u FROM User u WHERE u.email = :email")
@NamedQuery(
        name = "UserDao.getAllActiveUsers",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper(" +
                "u.id, CONCAT(u.firstName, ' ', u.lastName), u.email, u.role) " +
                "FROM User u WHERE u.status = true"
)

@NamedQuery(
        name = "UserDao.getUserProfile",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.UserResponseWrapper(" +
                "u.id, CONCAT(u.firstName, ' ', u.lastName), u.email, u.role) " +
                "FROM User u WHERE u.id=:userId AND u.status = true "
)
public class User implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;

    private Boolean status=true;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
