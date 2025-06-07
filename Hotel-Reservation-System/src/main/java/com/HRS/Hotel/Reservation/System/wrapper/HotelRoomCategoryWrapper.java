package com.HRS.Hotel.Reservation.System.wrapper;

import com.HRS.Hotel.Reservation.System.POJO.MediaFile;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class HotelRoomCategoryWrapper {
    private Integer id;
    private String imageUrl;
    private String description;
    private String roomCategoryType;

    public HotelRoomCategoryWrapper(Integer id, String imageUrl, String description, String roomCategoryType) {
        this.id = id;
        setImageUrl(imageUrl);
        this.description = description;
        this.roomCategoryType = roomCategoryType;

    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/")
                .path(imageUrl.startsWith("/") ? imageUrl.substring(1) : imageUrl)
                .toUriString();
    }

}
