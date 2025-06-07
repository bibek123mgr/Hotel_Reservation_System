package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;

@Data
public class UpdateAuthPasswordWrapper {
    private String oldPassword;
    private String newPassword;
}
