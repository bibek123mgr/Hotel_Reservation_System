package com.HRS.Hotel.Reservation.System.restImpl;

import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.rest.CommentRest;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CommentRestImpl implements CommentRest {

    private static final Logger logger=LoggerFactory.getLogger(CommentRestImpl.class);

    @Autowired
    private CommentService commentService;

    @Override
    public ResponseEntity<String> createComment(CreateCommentRequestWrapper createCommentRequestWrapper) {
       try{
           return commentService.createComment(createCommentRequestWrapper);
       } catch (Exception e) {
           logger.error("Error occured at CommentRestImpl:{}",e.getMessage(),e);
       }
       return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForPublic(Integer hotelId,
                                                                            Integer roomCategoryId) {
        try{
            return commentService.getCommentForPublic(hotelId,roomCategoryId);
        } catch (Exception e) {
            logger.error("Error occured at CommentRestImpl:{}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForHotelAdmin(Integer id) {
        try{
            return commentService.getCommentForHotelAdmin(id);
        } catch (Exception e) {
            logger.error("Error occured at CommentRestImpl:{}",e.getMessage(),e);
        }
        return new ResponseEntity<>(new ArrayList<>(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
