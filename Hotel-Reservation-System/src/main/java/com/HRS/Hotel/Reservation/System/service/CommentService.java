package com.HRS.Hotel.Reservation.System.service;

import com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.CreateCommentRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.GetCommentRequestWrapper;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    ResponseEntity<String> createComment(CreateCommentRequestWrapper createCommentRequestWrapper);

    ResponseEntity<List<CommentResponseWrapper>> getCommentForHotelAdmin(Integer id);

    ResponseEntity<List<CommentResponseWrapper>> getCommentForPublic(GetCommentRequestWrapper getCommentRequestWrapper);
}
