package com.HRS.Hotel.Reservation.System.rest;


import com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RequestMapping("/api/v1")
public interface MediaFileRest {
    @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> handleFileUpload(
            @RequestPart("file") MultipartFile file,
            @RequestPart("metaData") String metaDataJson
    );

    @PostMapping(value = "/uploads/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    ResponseEntity<String> handleFileUpdate(
            @PathVariable("id") Integer id,
            @RequestPart("file") MultipartFile file,
            @RequestPart("metaData") String metaDataJson
    );

    @PatchMapping(value = "/uploads/{id}")
    ResponseEntity<String> handleFileUpdateStatus(
            @PathVariable("id") Integer id
    );

    @GetMapping(value = "/uploads/{id}")
    ResponseEntity<MediaFileWrapper> getOneMediaFile(
            @PathVariable("id") Integer id
    );
}

