package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CommentResponseWrapper {
    private Integer id;
    private Double star;
    private String description;
    private String userName;
    private Integer userId;
    private String userEmail;
    private LocalDateTime createdAt;

    public CommentResponseWrapper(Integer id, Double star, String description, String userName, Integer userId, String userEmail, LocalDateTime createdAt) {
        this.id = id;
        this.star = star;
        this.description = description;
        this.userName = userName;
        this.userId = userId;
        this.userEmail = userEmail;
        this.createdAt = createdAt;
    }

}
