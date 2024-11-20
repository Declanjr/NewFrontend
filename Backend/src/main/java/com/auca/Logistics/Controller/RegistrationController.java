package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.auca.Logistics.Model.MyAppUser;
import com.auca.Logistics.Model.MyAppUserRepository;


@RestController
public class RegistrationController {

    @Autowired
    private MyAppUserRepository myAppUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

   @PostMapping(value = "/signup", consumes = "application/json")
public ResponseEntity<?> createUser(@RequestBody MyAppUser user) {
    // Check if username already exists
    if (myAppUserRepository.existsByUsername(user.getUsername())) {
        return ResponseEntity
            .badRequest()
            .body("Error: Username is already taken!");
    }
    
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    MyAppUser savedUser = myAppUserRepository.save(user);
    
    return ResponseEntity.ok(savedUser);
}
    
}
