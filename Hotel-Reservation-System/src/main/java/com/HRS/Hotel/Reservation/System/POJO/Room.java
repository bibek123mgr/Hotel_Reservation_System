package com.HRS.Hotel.Reservation.System.POJO;

import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.data.jpa.repository.Query;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "rooms")
@EntityListeners(AuditingEntityListener.class)
@NamedQueries({
        @NamedQuery(
                name = "RoomDao.getAllSpecificHotelRoom",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "r.id, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomNumber, " +
                        "r.roomTitle, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.floor, " +
                        "r.capacity, " +
                        "r.price, " +
                        "r.description, " +
                        "r.roomStatus, " +
                        "r.status, " +
                        "r.createdAt, " +
                        "r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE rc.id = :roomCategoryId"
        ),
//        @NamedQuery(
//                name = "RoomDao.getAllHotelRoom",
//                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
//                        "r.id, " +
//                        "r.hotel.id, " +
//                        "r.hotel.hotelName, " +
//                        "r.roomNumber, " +
//                        "r.roomTitle, " +
//                        "r.roomCategory.id, " +
//                        "r.roomCategory.roomCategoryType, " +
//                        "r.floor, " +
//                        "r.capacity, " +
//                        "r.price, " +
//                        "r.description, " +
//                        "r.roomStatus, " +
//                        "r.status, " +
//                        "r.createdAt) " +
//                        "FROM Room r " +
//                        "JOIN r.hotel h " +
//                        "JOIN r.roomCategory rc"
//        ),

        @NamedQuery(
                name = "RoomDao.getAllHotelRoom",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "r.id, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomNumber, " +
                        "r.roomTitle, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.floor, " +
                        "r.capacity, " +
                        "r.price, " +
                        "r.description, " +
                        "r.roomStatus, " +
                        "r.status, " +
                        "r.createdAt, " +
                        "r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE r.status = true"
        ),
        @NamedQuery(
                name = "RoomDao.getAllHotelRoomForPublic",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "    MIN(r.id), " +
                        "    MIN(r.hotel.id), " +
                        "    MIN(r.hotel.hotelName), " +
                        "    MIN(r.roomNumber), " +
                        "    MIN(r.roomTitle), " +
                        "    MIN(r.roomCategory.id), " +
                        "    MIN(r.roomCategory.roomCategoryType), " +
                        "    MIN(r.floor), " +
                        "    MIN(r.capacity), " +
                        "    MIN(r.price), " +
                        "    MIN(r.description), " +
                        "    r.roomStatus, " +
                        "    r.status, " +
                        "    MIN(r.createdAt), " +
                        "    (SELECT COUNT(r2) FROM Room r2 " +
                        "     WHERE r2.roomStatus = com.HRS.Hotel.Reservation.System.enums.RoomStatus.AVAILABLE " +
                        "     AND r2.status = true " +
                        "     AND r2.hotel.id = r.hotel.id " +
                        "     AND r2.roomCategory.id = r.roomCategory.id), " +
                        "r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE r.status = true " +
                        "GROUP BY r.hotel.id, r.roomCategory.id " +
                        "ORDER BY r.hotel.id, r.roomCategory.id"
        ),

        @NamedQuery(
                name = "RoomDao.getAllSpecificHotelRoomForPublic",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "    MIN(r.id), " +
                        "    MIN(r.hotel.id), " +
                        "    MIN(r.hotel.hotelName), " +
                        "    MIN(r.roomNumber), " +
                        "    MIN(r.roomTitle), " +
                        "    MIN(r.roomCategory.id), " +
                        "    MIN(r.roomCategory.roomCategoryType), " +
                        "    MIN(r.floor), " +
                        "    MIN(r.capacity), " +
                        "    MIN(r.price), " +
                        "    MIN(r.description), " +
                        "    r.roomStatus, " +
                        "    r.status, " +
                        "    MIN(r.createdAt), " +
                        "    (SELECT COUNT(r2) FROM Room r2 " +
                        "     WHERE r2.status = true " +
                        "     AND r2.hotel.id = r.hotel.id " +
                        "     AND r2.roomCategory.id = r.roomCategory.id), " +
                        "r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE r.status = true " +
                        "and r.hotel.id =:hotelId " +
                        "GROUP BY r.hotel.id, r.roomCategory.id " +
                        "ORDER BY r.hotel.id, r.roomCategory.id"
        ),
        @NamedQuery(
                name = "RoomDao.getRoomsByHotelId",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "r.id, " +
                        "r.hotel.id, " +
                        "r.hotel.hotelName, " +
                        "r.roomNumber, " +
                        "r.roomTitle, " +
                        "r.roomCategory.id, " +
                        "r.roomCategory.roomCategoryType, " +
                        "r.floor, " +
                        "r.capacity, " +
                        "r.price, " +
                        "r.description, " +
                        "r.roomStatus, " +
                        "r.status, " +
                        "r.createdAt, " +
                        "r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE r.hotel.id = :hotelId AND r.status = true"
        ),

        @NamedQuery(name = "RoomDao.getHotelRoomDetailForPublic",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper(" +
                        "    r.id, " +
                        "    r.hotel.id, " +
                        "    r.hotel.hotelName, " +
                        "    r.roomNumber, " +
                        "    r.roomTitle, " +
                        "    r.roomCategory.id, " +
                        "    r.roomCategory.roomCategoryType, " +
                        "    r.floor, " +
                        "    r.capacity, " +
                        "    r.price, " +
                        "    r.description, " +
                        "    r.roomStatus, " +
                        "    r.status, " +
                        "    r.createdAt, " +
                        "    (SELECT COUNT(r2) FROM Room r2 " +
                        "     WHERE r2.roomStatus = com.HRS.Hotel.Reservation.System.enums.RoomStatus.AVAILABLE " +
                        "     AND r2.status = true " +
                        "     AND r2.hotel.id = :hotelId " +
                        "     AND r2.roomCategory.id = :roomCategoryId), " +
                        "   r.imageUrl) " +
                        "FROM Room r " +
                        "JOIN r.hotel h " +
                        "JOIN r.roomCategory rc " +
                        "WHERE r.status = true " +
                        "AND r.hotel.id = :hotelId " +
                        "AND r.roomCategory.id = :roomCategoryId " +
                        "ORDER BY r.id ASC " +
                        "LIMIT 1"
        ),
        @NamedQuery(name = "RoomDao.getCountRoomOfHotel",
                query = "SELECT COUNT(r) FROM Room r WHERE r.status=true AND r.hotel.id=:hotelId"
        ),
        @NamedQuery(name = "RoomDao.getCountRoom",
                query = "SELECT COUNT(r) FROM Room r WHERE r.status=true "
        )


})
public class Room implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String roomTitle;

    private String roomNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hotel_id", nullable = false, foreignKey = @ForeignKey(name = "FK_room_hotel"))
    private Hotel hotel;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_category_id", nullable = false, foreignKey = @ForeignKey(name = "FK_room_category"))
    private RoomCategory roomCategory;


    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private RoomStatus roomStatus = RoomStatus.AVAILABLE;

    private Double price;

    private Integer capacity;

    private Integer floor;

    private String description;

    private Boolean status = true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false, foreignKey = @ForeignKey(name = "FK_user"))
    private User createdBy;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
