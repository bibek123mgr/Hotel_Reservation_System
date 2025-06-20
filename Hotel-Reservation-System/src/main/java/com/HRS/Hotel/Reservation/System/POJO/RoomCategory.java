package com.HRS.Hotel.Reservation.System.POJO;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "room_categories")
@EntityListeners(AuditingEntityListener.class)
@NamedQueries({
        @NamedQuery(
                name = "RoomCategory.getAllRoomCategories",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper(" +
                        "rc.id, rc.description, rc.roomCategoryType) " +
                        "FROM RoomCategory rc " +
                        "WHERE rc.status = true"
        ),
        @NamedQuery(
                name = "RoomCategory.getOneRoomCategories",
                query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.HotelRoomCategoryWrapper(" +
                        "rc.id, rc.description, rc.roomCategoryType) " +
                        "FROM RoomCategory rc " +
                        "WHERE rc.id = :id AND rc.status = true"
        )
})
public class RoomCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String roomCategoryType;

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
