package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.auca.Logistics.Model.MyAppUser;
import com.auca.Logistics.Model.MyAppUserRepository;
import com.auca.Logistics.Service.PasswordResetService;

@Controller
public class PasswordController {
    private final PasswordResetService passwordResetService;
    private final MyAppUserRepository userRepository;
    private final JavaMailSender mailSender;

    @Autowired
    public PasswordController(PasswordResetService passwordResetService, 
                            MyAppUserRepository userRepository,
                            JavaMailSender mailSender) {
        this.passwordResetService = passwordResetService;
        this.userRepository = userRepository;
        this.mailSender = mailSender;
    }

    @GetMapping("/forgot")
    public String showForgotPasswordForm() {
        return "forgot";
    }

    @PostMapping("/forgot")
    public String processForgotPassword(@RequestParam String email, Model model) {
        try {
            String token = passwordResetService.createResetToken(email);
            if (token == null) {
                model.addAttribute("error", "No user found with that email address.");
                return "forgot";
            }
            model.addAttribute("message", "Password reset instructions have been sent to your email.");
            return "forgot";
        } catch (Exception e) {
            model.addAttribute("error", "Error sending email. Please try again later.");
            e.printStackTrace(); // For debugging
            return "forgot";
        }
    }

    @GetMapping("/resetPassword")
    public String showResetPasswordForm(@RequestParam(required = false) String token, Model model) {
        if (token == null) {
            return "redirect:/forgot?error=Invalid reset link";
        }
        
        MyAppUser user = passwordResetService.validateResetToken(token);
        if (user == null) {
            return "redirect:/forgot?error=expired";
        }
        
        model.addAttribute("token", token);
        return "resetPassword";
    }

    @PostMapping("/resetPassword")
    public String processResetPassword(
            @RequestParam String token,
            @RequestParam String password,
            @RequestParam String passwordConfirm,
            Model model) {
        
        if (!password.equals(passwordConfirm)) {
            model.addAttribute("error", "Passwords do not match");
            model.addAttribute("token", token);
            return "resetPassword";
        }

        try {
            MyAppUser user = passwordResetService.validateResetToken(token);
            if (user == null) {
                return "redirect:/forgot?error=expired";
            }

            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            user.setPassword(passwordEncoder.encode(password));
            user.setResetToken(null);
            user.setTokenExpiryDate(null);
            userRepository.save(user);
            
            return "redirect:/login?message=passwordReset";
        } catch (Exception e) {
            model.addAttribute("error", "Error resetting password");
            model.addAttribute("token", token);
            return "resetPassword";
        }
    }
}