package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.MediaFileRest;
import com.HRS.Hotel.Reservation.System.service.MediaFileService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.fasterxml.jackson.core.type.TypeReference;

import java.util.Map;

@RestController
public class MediaFileRestImpl implements MediaFileRest {

    private static final Logger logger = LoggerFactory.getLogger(MediaFileRestImpl.class);

    @Autowired
    private MediaFileService mediaFileService;

    @Override
    public ResponseEntity<String> handleFileUpload(MultipartFile file, String metaDataJson) {
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> metaData = objectMapper.readValue(metaDataJson, new TypeReference<Map<String, String>>() {});
            return mediaFileService.handleFileUpload(file, metaData);
        } catch (Exception e) {
            logger.error("Error occurred in MediaFileRestImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> handleFileUpdate(Integer id, MultipartFile file, String metaDataJson) {
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, String> metaData = objectMapper.readValue(metaDataJson, new TypeReference<Map<String, String>>() {});
            return mediaFileService.handleFileUpdate(id, file, metaData);
        } catch (Exception e) {
            logger.error("Error occurred in MediaFileRestImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> handleFileUpdateStatus(Integer id) {
        try{
            return mediaFileService.handleFileUpdateStatus(id);
        } catch (Exception e) {
            logger.error("Error occurred in MediaFileRestImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<MediaFileWrapper> getOneMediaFile(Integer id) {
        try{
            return mediaFileService.getOneMediaFile(id);
        } catch (Exception e) {
            logger.error("Error occurred in MediaFileRestImpl {}", e.getMessage(), e);
        }
        return new ResponseEntity<>(new MediaFileWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}