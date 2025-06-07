package com.HRS.Hotel.Reservation.System.DAO;

import com.HRS.Hotel.Reservation.System.POJO.MediaFile;
import com.HRS.Hotel.Reservation.System.wrapper.MediaFileWrapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MediaFileDao extends JpaRepository<MediaFile,Integer> {

    @Query(name = "MediaFileDao.deleteMediaFile")
    void deleteMediaFile(@Param("id") Integer id);

    @Query(name = "MediaFileDao.getOneMediaFileById")
    MediaFileWrapper getOneMediaFileById(@Param("id") Integer id);
}
