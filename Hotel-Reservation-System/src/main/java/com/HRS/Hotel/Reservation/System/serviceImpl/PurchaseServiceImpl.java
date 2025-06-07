package com.HRS.Hotel.Reservation.System.serviceImpl;

import com.HRS.Hotel.Reservation.System.DAO.PurchaseDao;
import com.HRS.Hotel.Reservation.System.POJO.Hotel;
import com.HRS.Hotel.Reservation.System.POJO.HotelHighInfoDetail;
import com.HRS.Hotel.Reservation.System.POJO.Purchase;
import com.HRS.Hotel.Reservation.System.POJO.User;
import com.HRS.Hotel.Reservation.System.constant.HotelConstant;
import com.HRS.Hotel.Reservation.System.service.PurchaseService;
import com.HRS.Hotel.Reservation.System.utils.HotelUtils;
import com.HRS.Hotel.Reservation.System.wrapper.PurchaseRequestWrapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class PurchaseServiceImpl implements PurchaseService {

    private static final Logger logger= LoggerFactory.getLogger(PurchaseServiceImpl.class);

    @Autowired
    private PurchaseDao purchaseDao;

    @Override
    public ResponseEntity<String> createPurchase(PurchaseRequestWrapper reqBody) {
        try{
            purchaseDao.save(buildPurchaseFromRequest(reqBody));
            return HotelUtils.getResponse(HotelConstant.DATA_SUCCESSFULLY_SAVED, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error Occurred at PurchaseServiceImpl {}",e.getMessage(),e);
        }
        return HotelUtils.getResponse(HotelConstant.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private Purchase buildPurchaseFromRequest(PurchaseRequestWrapper reqBody){
        Purchase purchase=new Purchase();

        Hotel hotel=new Hotel();
        hotel.setId(reqBody.getHotelId());

        HotelHighInfoDetail hotelHighInfoDetail=new HotelHighInfoDetail();
        hotelHighInfoDetail.setId(reqBody.getHotelHighInfoDetail());

        User user=new User();
        user.setId(reqBody.getCreated_by());

        purchase.setHotel(hotel);
        purchase.setHotelHighInfoDetail(hotelHighInfoDetail);
        purchase.setAmount(reqBody.getAmount());
        purchase.setQuantity(reqBody.getStockInQty());
        purchase.setRate(reqBody.getRate());
        purchase.setCreatedBy(user);

        return purchase;
    }

}
