package com.auca.Logistics.Controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auca.Logistics.Model.LoginRequest;
import com.auca.Logistics.Service.AuthenticationService;

@RestController
public class LoginController {
    private final AuthenticationService authenticationService;

    @Autowired
    public LoginController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        boolean isAuthenticated = authenticationService.authenticate(
            loginRequest.getUsername(), 
            loginRequest.getPassword()
        );

        if (isAuthenticated) {
            // Return a success response with user details or a token
            return ResponseEntity.ok().body(Map.of(
                "message", "Login successful",
                "username", loginRequest.getUsername()
            ));
        } else {
            // Return an unauthorized response
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "Invalid username or password"));
        }
    }
}