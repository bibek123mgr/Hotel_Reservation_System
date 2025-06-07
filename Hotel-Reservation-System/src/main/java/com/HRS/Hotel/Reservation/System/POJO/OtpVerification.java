package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "otp_verification")

@NamedQuery(
        name = "OtpVerification.userFindByUserId",
        query = "SELECT a FROM OtpVerification a WHERE a.userId = :userid ORDER BY a.id DESC"
)
public class OtpVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer userId;
    private Integer otp;
    private LocalDateTime expiryTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
