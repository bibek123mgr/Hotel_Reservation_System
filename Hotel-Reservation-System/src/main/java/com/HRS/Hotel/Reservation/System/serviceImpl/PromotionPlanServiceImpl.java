package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.MediaFileDao;
import com.HRS.Hotel.Reservation.System.DAO.PromotionPlanDao;
import com.HRS.Hotel.Reservation.System.POJO.MediaFile;
import com.HRS.Hotel.Reservation.System.POJO.PromotionPlan;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.PromotionPlanService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.PromotionPlanRequestWrapper;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class PromotionPlanServiceImpl implements PromotionPlanService {

    private static final Logger logger = LoggerFactory.getLogger(PromotionPlanServiceImpl.class);

    @Value("${file.upload.directory:uploads/}")
    private String uploadDir;

    @Autowired
    private PromotionPlanDao promotionPlanDao;

    @Autowired
    private MediaFileDao mediaFileDao;

    @Override
    public ResponseEntity<String> createPromotionPlan(PromotionPlanRequestWrapper requestBody, MultipartFile file) {
        try {
            SavedFileInfo savedFileInfo = saveFileToDisk(file);

            final Integer userId = 1;
            MediaFile mediaFile = mapCreateMediaFile(savedFileInfo.getFileName(), savedFileInfo.getFileType(),userId);
            mediaFileDao.save(mediaFile);
            PromotionPlan promotionPlan = mapCreatePromotionPlan(requestBody, userId, mediaFile.getId());
            promotionPlanDao.save(promotionPlan);
            return HotelUtils.getResponse("Promotion Plan created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error occurred at PromotionPlanServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updatePromotionPlan(PromotionPlanRequestWrapper requestBody, Integer id) {
        try {
            promotionPlanDao.updatePromotionPlan(requestBody.getTitle(),requestBody.getAffectedFrom(),requestBody.getAffectedTo(),id);
            return HotelUtils.getResponse("Promotion Plan updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred at PromotionPlanServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> removePromotionPlan(Integer id) {
        try {
            promotionPlanDao.updateStatusById(id);
            return HotelUtils.getResponse("Promotion Plan deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred at PromotionPlanServiceImpl {}", e.getMessage(), e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private PromotionPlan mapCreatePromotionPlan(PromotionPlanRequestWrapper requestBody,Integer userId,Integer mediaUrlId) {
        PromotionPlan promotionPlan = new PromotionPlan();

        User user = new User();
        user.setId(userId);

        MediaFile mediaFile=new MediaFile();
        mediaFile.setId(mediaUrlId);

        promotionPlan.setCreatedBy(user);
        promotionPlan.setImageUrl(mediaFile);
        promotionPlan.setTitle(requestBody.getTitle());
        promotionPlan.setAffectedFrom(requestBody.getAffectedFrom());
        promotionPlan.setAffectedTo(requestBody.getAffectedTo());
        promotionPlan.setStatus(true);
        return promotionPlan;
    }

    private MediaFile mapCreateMediaFile(String fileName, String fileType,Integer userId) {
        MediaFile media = new MediaFile();
        User user = new User();
        user.setId(userId);
        media.setComes_from("Promotion Plan");
        media.setSaved_by(user);
        media.setStatus(true);
        media.setMediaUrl(fileName);
        media.setMediaType(fileType);
        return media;
    }

    private SavedFileInfo saveFileToDisk(MultipartFile file) throws Exception {
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

            return new SavedFileInfo(fileName, fileType);
        } catch (IOException e) {
            logger.error("File operation failed", e);
            throw new Exception("File operation failed", e);
        }
    }

    private static class SavedFileInfo {
        private final String fileName;
        private final String fileType;

        public SavedFileInfo(String fileName, String fileType) {
            this.fileName = fileName;
            this.fileType = fileType;
        }

        public String getFileName() {
            return fileName;
        }

        public String getFileType() {
            return fileType;
        }
    }
}
