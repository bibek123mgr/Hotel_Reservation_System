package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.Comment;
import com.HRS.Hotel.Reservation.System.wrapper.CommentResponseWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentDao extends JpaRepository<Comment,Integer> {

    @Query(name = "CommentDao.getCommentForPublic")
    List<CommentResponseWrapper> getCommentForPublic(@Param("hotelId") Integer hotelId,@Param("categoryId") Integer categoryId);


    @Query(name = "CommentDao.getCommentOfRoom")
    List<CommentResponseWrapper> getCommentOfRoom(@Param("roomId") Integer roomId);



}
