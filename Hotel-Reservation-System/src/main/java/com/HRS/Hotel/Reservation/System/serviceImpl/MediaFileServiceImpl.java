package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.MediaFileDao;
import com.HRS.Hotel.Reservation.System.POJO.MediaFile;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.MediaFileService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@Service
@Transactional
public class MediaFileServiceImpl implements MediaFileService {

    private static final Logger logger = LoggerFactory.getLogger(MediaFileServiceImpl.class);

    @Value("${file.upload.directory:uploads/}")
    private String uploadDir;

    @Autowired
    private MediaFileDao mediaFileDao;

    @Override
    public ResponseEntity<String> handleFileUpload(MultipartFile file, Map<String, String> metaData) {
        try {
            saveFileToDiskAndDatabase(file, metaData);
            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in handleFileUpload", e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> handleFileUpdate(Integer id, MultipartFile file, Map<String, String> metaData) {
        try {
            updateMediaFileStatusById(id);
            saveFileToDiskAndDatabase(file, metaData);
            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in handleFileUpdate", e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> handleFileUpdateStatus(Integer id) {
        try {
            updateMediaFileStatusById(id);
            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in handleFileUpdateStatus", e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<MediaFileWrapper> getOneMediaFile(Integer id) {
        try {
            MediaFileWrapper mediaFile = mediaFileDao.getOneMediaFileById(id);
            System.out.println(mediaFile);
            return new ResponseEntity<>(mediaFile, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred in getOneMediaFile", e);
            return new ResponseEntity<>(new MediaFileWrapper(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private MediaFile mapDataInMediaFile(Map<String, String> metaData, String filename, String extension) {
        MediaFile mediaFile = new MediaFile();
        mediaFile.setMediaUrl("/uploads/" + filename);
        mediaFile.setMediaType(extension);
        mediaFile.setOwnerType(metaData.get("ownerType"));
//        mediaFile.setSaved_by(Integer.parseInt(metaData.get("userId")));
        mediaFile.setCreatedAt(LocalDateTime.now());
        mediaFile.setUpdatedAt(LocalDateTime.now());
//        mediaFile.setStatus(1);
        return mediaFile;
    }

    private void updateMediaFileStatusById(Integer id) throws Exception {
        try {
            mediaFileDao.deleteMediaFile(id);
        } catch (Exception e) {
            logger.error("Error occurred while updating status of media file ID {}", id, e);
            throw new Exception("Failed to update media file status");
        }
    }

    private void saveFileToDiskAndDatabase(MultipartFile file, Map<String, String> metaData) throws Exception {
        try {
            String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            String fileType = originalFileName.contains(".")
                    ? originalFileName.substring(originalFileName.lastIndexOf("."))
                    : "";
            String timeStamp = String.valueOf(System.currentTimeMillis());
            String fileName = timeStamp + "-" + originalFileName;

            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            MediaFile mediaFile = mapDataInMediaFile(metaData, fileName, fileType);
            mediaFileDao.save(mediaFile);
        } catch (IOException e) {
            logger.error("File operation failed", e);
            throw new Exception("File operation failed", e);
        } catch (Exception e) {
            logger.error("Database operation failed", e);
            throw new Exception("Database operation failed", e);
        }
    }
}