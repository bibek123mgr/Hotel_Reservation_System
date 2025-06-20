package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "hotels")


@NamedQuery(  name = "HotelDao.findByUserId",
        query = "SELECT h FROM Hotel h WHERE ownerId =: userId AND status=true AND hotelCode =: code"
)

@NamedQuery(
        name = "HotelDao.findByUserIdOnly",
        query = "SELECT h FROM Hotel h WHERE ownerId =: userId AND status=true"
)

@NamedQuery(
        name = "HotelDao.findAllActiveHotel",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.GetAllActiveHotelsWrapper(id, hotelCode, hotelName) " +
                "FROM Hotel WHERE status = true"
)

@NamedQuery(
        name = "HotelDao.findAvailableHotelsWithFilters",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.HotelListWrapper(" +
                "h.id, h.hotelName, h.description, h.address,h.imageUrl, h.checkInTime, h.checkOutTime) " +
                "FROM Hotel h WHERE h.status = true"
)



@NamedQuery(
        name = "HotelDao.findAvailableHotelsNearByWithFilters",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.HotelListWrapper(" +
                "h.id, h.hotelName, h.description, h.address,h.imageUrl, h.checkInTime, h.checkOutTime) " +
                "FROM Hotel h " +
                "WHERE (6371 * acos( cos(radians(:latitude)) * cos(radians(h.latitude)) * " +
                "cos(radians(h.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(h.latitude)) )) < :radius " +
                "AND h.status = true"
)


public class Hotel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer hotelCode;
    private String hotelName;
    private Integer ownerId;

    private String description;

    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String googleMapLink;
    private Double longitude;
    private Double latitude;
    private String checkInTime;
    private String checkOutTime;

    private Boolean status=true;


    private String imageUrl;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;

}
