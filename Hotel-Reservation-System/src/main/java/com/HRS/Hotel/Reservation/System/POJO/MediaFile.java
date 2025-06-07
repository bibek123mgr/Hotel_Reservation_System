package com.HRS.Hotel.Reservation.System.POJO;
import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "media_files")

// NamedQuery for deleting media files (soft delete by setting status to 0)
@NamedQuery(name = "MediaFileDao.deleteMediaFile",
        query = "UPDATE MediaFile m SET m.status = false WHERE m.id = :id")

// NamedQuery for fetching MediaFile by id and status
@NamedQuery(name = "MediaFileDao.getOneMediaFileById",
        query = "SELECT NEW com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper(m.id, m.mediaUrl) " +
                "FROM MediaFile m WHERE m.id = :id AND m.status = true")


public class MediaFile implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String mediaUrl;
    private String mediaType;

    private String ownerType;
    private String comes_from;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "saved_by")
    private User saved_by;

    private Boolean status;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
