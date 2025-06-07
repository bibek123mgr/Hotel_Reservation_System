package com.HRS.Hotel.Reservation.System.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    private static final String SEND_FROM="bibekmagar746@gmail.com";

    public void sendMail(String to,String subject,String body){
        SimpleMailMessage message=new SimpleMailMessage();
        message.setFrom(SEND_FROM);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

}
