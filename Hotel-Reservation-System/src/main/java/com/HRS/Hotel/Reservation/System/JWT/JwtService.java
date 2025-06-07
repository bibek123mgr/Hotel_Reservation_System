package com.HRS.Hotel.Reservation.System.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private String secretKey="";
    public JwtService (){
        try{
            KeyGenerator keyGen=KeyGenerator.getInstance("HmacSHA256");
            SecretKey key=keyGen.generateKey();
            secretKey= Base64.getEncoder().encodeToString(key.getEncoded());
        }catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
    private SecretKey getKey(){
        byte[] keyBytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Claims extractAllClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();

    }

    public <T> T extractClaims(String token, Function<Claims,T> claimResolver){
        final Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String extractUsername(String token){
        return extractClaims(token,Claims :: getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaims(token,Claims::getExpiration);
    }

    private boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public boolean validateToken(String token, UserDetails userDetails){
        final String username=extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String generateToken(String username,String role) {
        Map<String,Object> claims=new HashMap<>();
        claims.put("role",role);
        return createToken(claims,username);
    }

    private String createToken(Map<String,Object> claims,String username){
        return Jwts
                .builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24))
                .and()
                .signWith(getKey())
                .compact();

    }


    public <T> T extractRefreshTokenClaims(String refreshToken,Function<Claims,T> claimResolver){
        final Claims claims=extractAllRefreshTokenClaims(refreshToken);
        return claimResolver.apply(claims);
    }

    private Claims extractAllRefreshTokenClaims(String refreshToken){
        return Jwts
                .parser()
                .verifyWith(getKey())
                .build()
                .parseSignedClaims(refreshToken)
                .getPayload();
    }

    public String extractRefreshTokenUsername(String refreshToken){
        return extractRefreshTokenClaims(refreshToken,Claims :: getSubject);
    }

    public Date extractRefreshTokenExpiration(String refreshToken){
        return extractRefreshTokenClaims(refreshToken,Claims::getExpiration);
    }

    private boolean isRefreshTokenExpired(String refreshToken){
        return extractRefreshTokenExpiration(refreshToken).before(new Date());
    }

    public boolean validateRefreshToken(String refreshToken, UserDetails userDetails){
        final String username=extractRefreshTokenUsername(refreshToken);
        return username.equals(userDetails.getUsername()) && !isRefreshTokenExpired(refreshToken);
    }

    public String generateRefreshToken(String username,String role) {
        Map<String,Object> claims=new HashMap<>();
        claims.put("role",role);
        return createRefreshToken(claims,username);
    }

    private String createRefreshToken(Map<String,Object> claims,String username){
        return Jwts
                .builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+1000*60*60*24*7))
                .and()
                .signWith(getKey())
                .compact();
    }


}
