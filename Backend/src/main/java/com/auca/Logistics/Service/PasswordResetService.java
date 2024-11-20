package com.auca.Logistics.Service;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.auca.Logistics.Model.MyAppUser;
import com.auca.Logistics.Model.MyAppUserRepository;


@Service
public class PasswordResetService {

     private final MyAppUserRepository userRepository;
    private final JavaMailSender mailSender;

    public PasswordResetService(MyAppUserRepository userRepository, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    public String createResetToken(String email) {
        MyAppUser user = userRepository.findByEmail(email).orElse(null);

        if (user != null) {
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setTokenExpiryDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour
            userRepository.save(user);
            sendResetEmail(user.getEmail(), token);
            return token;
        }
        return null;
    }

    private void sendResetEmail(String email, String token) {
        String resetUrl = "http://localhost:8080/resetPassword?token=" + token;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("declannuwagaba02@gmail.com");
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("Click the link to reset your password: " + resetUrl);
        mailSender.send(message);
    }

    public MyAppUser validateResetToken(String token) {
        MyAppUser user = userRepository.findByResetToken(token).orElse(null);
        if (user != null && user.getTokenExpiryDate().isAfter(LocalDateTime.now())) {
            return user;
        }
        return null;
    }
    
}
