package com.HRS.Hotel.Reservation.System.config;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

@Service
public class CookieService {

    private static final String COOKIE_NAME="Token";
    private static final int EXPIRY_TIME=10;

    public void setBearerToken(HttpServletResponse response, String token){
        String bearerToken="Bearer "+token;
        Cookie cookie=new Cookie(COOKIE_NAME,bearerToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(EXPIRY_TIME * 60 * 60);
        response.addCookie(cookie);
    }

    public void clearBearerToken(HttpServletResponse response){
        Cookie cookie=new Cookie(COOKIE_NAME,"");
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public String getBearerToken(HttpServletRequest request){
        if(request.getServletPath() != null){
            for(Cookie cookie : request.getCookies()){
                if(COOKIE_NAME.equals(cookie.getName())){
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}
