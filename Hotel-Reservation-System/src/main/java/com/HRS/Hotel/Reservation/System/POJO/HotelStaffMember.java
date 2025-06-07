package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "hotel_staff_members")
public class HotelStaffMember implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer hotelId;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String role;
    private Integer status;
    private Integer createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
