package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponseWrapper {

    private Integer id;
    private String name;
    private String email;
    private String role;

    public UserResponseWrapper(Integer id, String name, String email, String role) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
    }

}
