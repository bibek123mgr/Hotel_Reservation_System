package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.CommentDao;
import com.HRS.Hotel.Reservation.System.DAO.ReservationDao;
import com.HRS.Hotel.Reservation.System.POJO.Comment;
import com.HRS.Hotel.Reservation.System.POJO.Reservation;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.POJO.UserPrincipal;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.CommentService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.CreateCommentRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.GetCommentRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    private static final Logger logger = LoggerFactory.getLogger(CommentServiceImpl.class);

    @Autowired
    private CommentDao commentDao;

    @Autowired
    private ReservationDao reservationDao;

    @Override
    public ResponseEntity<String> createComment(CreateCommentRequestWrapper createCommentRequestWrapper) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

            Optional<Reservation> optionalReservation = reservationDao.findById(createCommentRequestWrapper.getReservationId());
            if (optionalReservation.isEmpty()) {
                return HotelUtils.getResponse(HotelConstant.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }

            Reservation reservation = optionalReservation.get();
            Comment comment = new Comment();
            comment.setHotel(reservation.getHotel());
            comment.setReservation(reservation);
            comment.setRoom(reservation.getRoom());
            User user = new User();
            user.setId(userPrincipal.getId());
            comment.setCreatedBy(user);
            comment.setRoomCategory(reservation.getRoomCategory());
            comment.setStar(createCommentRequestWrapper.getStar());
            comment.setDescription(createCommentRequestWrapper.getDescription());

            commentDao.save(comment);

            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred at CommentServiceImpl#createComment: {}", e.getMessage(), e);
            return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForHotelAdmin(Integer roomId) {
        try {
            List<CommentResponseWrapper> comments = commentDao.getCommentOfRoom(roomId);
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred at CommentServiceImpl#getCommentForHotelAdmin: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForPublic(GetCommentRequestWrapper getCommentRequestWrapper) {
        try {
            List<CommentResponseWrapper> comments = commentDao.getCommentForPublic(
                    getCommentRequestWrapper.getHotelId(),
                    getCommentRequestWrapper.getRoomCategoryId()
            );
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            logger.error("Error occurred at CommentServiceImpl#getCommentForPublic: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
