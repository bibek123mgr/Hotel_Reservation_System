package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.HotelRoomCategoryDao;
import com.HRS.Hotel.Reservation.System.DAO.MediaFileDao;
import com.HRS.Hotel.Reservation.System.DAO.ReservationDao;
import com.HRS.Hotel.Reservation.System.DAO.RoomDao;
import com.HRS.Hotel.Reservation.System.POJO.*;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.enums.ReservationStatus;
import com.HRS.Hotel.Reservation.System.enums.RoomStatus;
import com.HRS.Hotel.Reservation.System.service.HotelRoomService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.HotelRoomDetailPublicRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.RoomResponseWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class HotelRoomServiceImpl implements HotelRoomService {

    @Autowired
    private RoomDao roomDao;

    @Value("${file.upload.directory:uploads/}")
    private String uploadDir;

    @Autowired
    private MediaFileDao mediaFileDao;

    @Autowired
    private ReservationDao reservationDao;

    private Integer hotelId=null;
    private Integer userId=null;

    private static final Logger logger= LoggerFactory.getLogger(HotelRoomServiceImpl.class);

    @Override
    public ResponseEntity<String> addHotelRoom(RoomRequestWrapper roomRequestWrapper, MultipartFile file) {

        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            hotelId=userPrincipal.getHotelId();
            userId=userPrincipal.getHotelId();
            MediaFile mediaFile=saveFileToDiskAndDatabase(file);

            Room room=mapRoomRequestWrapper((roomRequestWrapper),hotelId,userId);
            room.setImageUrl(mediaFile);
            roomDao.save(room);

            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private MediaFile saveFileToDiskAndDatabase(MultipartFile file) throws Exception {
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

            MediaFile mediaFile = mapDataInMediaFile(fileName, fileType);
            mediaFileDao.save(mediaFile);
            return mediaFile;
        } catch (IOException e) {
            logger.error("File operation failed", e);
            throw new Exception("File operation failed", e);
        } catch (Exception e) {
            logger.error("Database operation failed", e);
            throw new Exception("Database operation failed", e);
        }
    }

    private MediaFile mapDataInMediaFile(String filename, String extension) {
        MediaFile mediaFile = new MediaFile();
        mediaFile.setMediaUrl("/uploads/" + filename);
        mediaFile.setMediaType(extension);
        mediaFile.setOwnerType("rooms");
//        mediaFile.setSaved_by(Integer.parseInt(metaData.get("userId")));
        mediaFile.setCreatedAt(LocalDateTime.now());
        mediaFile.setUpdatedAt(LocalDateTime.now());
//        mediaFile.setStatus(1);
        return mediaFile;
    }



    @Override
    public ResponseEntity<String> updateHotelRoom(RoomRequestWrapper roomRequestWrapper, Integer roomId) {
        try{
            Room existingRoom = roomDao.findById(roomId).orElse(null);
            if (existingRoom == null) {
                return HotelUtils.getResponse("Room not found with ID: " + roomId, HttpStatus.NOT_FOUND);
            }else {

                RoomCategory roomCategory = new RoomCategory();
                roomCategory.setId(roomRequestWrapper.getRoomCategoryId());

                existingRoom.setRoomStatus(roomRequestWrapper.getRoomStatus());
                existingRoom.setRoomCategory(roomCategory);
                existingRoom.setRoomNumber(roomRequestWrapper.getRoomNumber());
                existingRoom.setStatus(true);

                roomDao.save(existingRoom);
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
            }
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllSpecificHotelRoom(Integer roomCategoryId) {
        try{
            List<RoomResponseWrapper> rooms=roomDao.getAllSpecificHotelRoom(roomCategoryId);
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoom() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            List<RoomResponseWrapper> rooms;

            if (userPrincipal.isSuperAdmin()) {
                rooms = roomDao.getAllHotelRoom();
            } else if (userPrincipal.isHotelAdmin()) {
                rooms = roomDao.getRoomsByHotelId(userPrincipal.getHotelId());
            } else {
                return new ResponseEntity<>(new ArrayList<>(), HttpStatus.FORBIDDEN);
            }
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteHotelRoom(Integer roomId) {
        try{
            Optional<Room> room=roomDao.findById(roomId);
            if(room.isPresent()){
                    Room updatedRoom=room.get();
                    updatedRoom.setStatus(false);
                    roomDao.save(updatedRoom);
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_DELETED, HttpStatus.OK);
            }else{
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<RoomResponseWrapper>> getAllHotelRoomForPublic() {
        try {
            List<RoomResponseWrapper> rooms = roomDao.getAllHotelRoomForPublic();
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<RoomResponseWrapper> getHotelRoomDetailForPublic(Integer hotelId, Integer roomCategoryId) {
        try {
            RoomResponseWrapper rooms = roomDao.getHotelRoomDetailForPublic(hotelId,roomCategoryId);
            return new ResponseEntity<>(rooms, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error Occurred at HotelRoomServiceImpl: {}", e.getMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateHotelRoomStatus(Integer roomId, RoomStatus roomStatus) {
        try {
            Optional<Room> roomOptional = roomDao.findById(roomId);
            if (roomOptional.isPresent()) {
                Room room = roomOptional.get();

                if (roomStatus.equals(RoomStatus.AVAILABLE)) {
                    List<ReservationStatus> reservationStatuses = Arrays.asList(
                            ReservationStatus.PENDING,
                            ReservationStatus.CONFIRMED,
                            ReservationStatus.CHECKED_IN
                    );
                    Optional<Reservation> reservationOptional = reservationDao.findFirstByRoomAndReservationStatusIn(room, reservationStatuses);
                    reservationOptional.ifPresent(reservation -> {
                        reservation.setReservationStatus(ReservationStatus.CHECKED_OUT);
                        reservationDao.save(reservation);
                    });
                }

                room.setRoomStatus(roomStatus);
                roomDao.save(room);
                return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_UPDATED, HttpStatus.OK);
            } else {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error("Error occurred at HotelRoomServiceImpl: {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    public Room mapRoomRequestWrapper(RoomRequestWrapper roomRequestWrapper,Integer hotelId,Integer userId){

        System.out.println(roomRequestWrapper);
        Room room=new Room();

        Hotel hotel=new Hotel();
        hotel.setId(hotelId);

        User user=new User();
        user.setId(userId);

        RoomCategory roomCategory=new RoomCategory();
        roomCategory.setId(roomRequestWrapper.getRoomCategoryId());

        room.setRoomTitle(roomRequestWrapper.getRoomTitle());
        room.setPrice(roomRequestWrapper.getPrice());
        room.setFloor(roomRequestWrapper.getFloor());
        room.setCapacity(roomRequestWrapper.getCapacity());
        room.setDescription(roomRequestWrapper.getDescription());
        room.setRoomStatus(roomRequestWrapper.getRoomStatus());
        room.setRoomCategory(roomCategory);
        room.setCreatedBy(user);
        room.setHotel(hotel);
        room.setStatus(true);
        room.setRoomNumber(roomRequestWrapper.getRoomNumber());
        return room;
    }




}
