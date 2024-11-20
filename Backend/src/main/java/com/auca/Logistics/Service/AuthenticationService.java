package com.auca.Logistics.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final MyAppUserService myAppUserService;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthenticationService(MyAppUserService myAppUserService, AuthenticationManager authenticationManager) {
        this.myAppUserService = myAppUserService;
        this.authenticationManager = authenticationManager;
    }

    public Boolean authenticate(String username, String password) {
    try {
        // Load user by username
        UserDetails user = myAppUserService.loadUserByUsername(username);

        // Create authentication token with user details
        UsernamePasswordAuthenticationToken authentication =
            new UsernamePasswordAuthenticationToken(user, password, user.getAuthorities());

        // Authenticate the user
        authenticationManager.authenticate(authentication);

        // Set authentication to Security Context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        System.out.println("--------------------------------------------------------------------");
        System.out.println("User authenticated: " + user.getUsername() + " with roles: " + user.getAuthorities());
        System.out.println("--------------------------------------------------------------------");

        System.out.println("--------------------------------------------------------------------");
        System.out.println("User authenticated: " + authentication.getName() + " with roles --- : " + authentication.getAuthorities());
        System.out.println("--------------------------------------------------------------------");
        
        return true; // Return true if authentication is successful

    } catch (BadCredentialsException e) {
        return false; // Return false if authentication fails
    }
}

}
