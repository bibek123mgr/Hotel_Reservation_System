package com.HRS.Hotel.Reservation.System.wrapper;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Data
@NoArgsConstructor
public class MediaFileWrapper {
    private Integer id;
    private String imageUrl;

    public MediaFileWrapper(Integer id, String imageUrl) {
        this.id = id;
        setImageUrl(imageUrl); // Use the setter to ensure URL processing
    }

    public void setImageUrl(String imageUrl) {
            this.imageUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/")
                    .path(imageUrl.startsWith("/") ? imageUrl.substring(1) : imageUrl)
                    .toUriString();
        }

}