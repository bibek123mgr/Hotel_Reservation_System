package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface MediaFileService {
    public ResponseEntity<String> handleFileUpload(MultipartFile file, Map<String, String> metaData);

    public ResponseEntity<String> handleFileUpdate(Integer id, MultipartFile file, Map<String, String> metaData);

    ResponseEntity<String> handleFileUpdateStatus(Integer id);

    ResponseEntity<MediaFileWrapper> getOneMediaFile(Integer id);
}
