package com.HRS.Hotel.Reservation.System.rest;

import com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.CreateCommentRequestWrapper;
import com.HRS.Hotel.Reservation.System.wrapper.GetCommentRequestWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1")
public interface CommentRest {

    @PostMapping("/create-comment")
    public ResponseEntity<String> createComment(@RequestBody CreateCommentRequestWrapper createCommentRequestWrapper);

    @GetMapping("/public-comment")
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForPublic(@RequestParam Integer hotelId,
                                                                            @RequestParam Integer roomCategoryId);

    @GetMapping("/comment/{id}")
    public ResponseEntity<List<CommentResponseWrapper>> getCommentForHotelAdmin(@PathVariable Integer id);

}
