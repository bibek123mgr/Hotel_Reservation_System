package com.HRS.Hotel.Reservation.System.POJO;

import com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "comments")
@NamedQuery(
        name = "CommentDao.getCommentForPublic",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper(" +
                "c.id, c.star, c.description, CONCAT(c.createdBy.firstName, ' ', c.createdBy.lastName), " +
                "c.createdBy.id, c.createdBy.email, c.createdAt) " +
                "FROM Comment c " +
                "WHERE c.status = true AND c.hotel.id = :hotelId AND c.roomCategory.id = :categoryId"
)
@NamedQuery(
        name = "CommentDao.getCommentOfRoom",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper(" +
                "c.id, c.star, c.description, CONCAT(c.createdBy.firstName, ' ', c.createdBy.lastName), " +
                "c.createdBy.id, c.createdBy.email, c.createdAt) " +
                "FROM Comment c " +
                "WHERE c.status = true AND c.room.id = :roomId"
)
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "reservation_id", nullable = false, unique = true)
    private Reservation reservation;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "hotel_id", nullable = false)
    private Hotel hotel;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_category_id", nullable = false)
    private RoomCategory roomCategory;

    @Column(nullable = false)
    private Double star;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Boolean status = true;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
