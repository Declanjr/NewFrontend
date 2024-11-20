package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.auca.Logistics.Service.AuthenticationService;

@Controller
public class LoginController {

    private final AuthenticationService authenticationService;

    @Autowired
    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public String login(
            @RequestParam String username,
            @RequestParam String password,
            Model model) {
        
        boolean isAuthenticated = authenticationService.authenticate(username, password);
        
        if (isAuthenticated) {
            return "redirect:/StaffHome";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }
}
