package com.auca.Logistics.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auca.Logistics.Model.MyAppUser;
import com.auca.Logistics.Model.MyAppUserRepository;
import com.auca.Logistics.Model.Role;

@Service
public class AdminService {

      @Autowired
    private MyAppUserRepository userRepository;

    public MyAppUser assignRoleToUser(Long userId, Role role) {
        MyAppUser user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setRole(role);
        return userRepository.save(user);
    }
    
    // @Autowired
    // private MyAppUserRepository appUserRepository;

    // // Only ADMIN can promote to MANAGER or ADMIN
    // @PreAuthorize("hasRole('ADMIN')")
    // @Transactional
    // public void promoteToManager(Long userId) {
    //     MyAppUser user = appUserRepository.findById(userId)
    //         .orElseThrow(() -> new RuntimeException("User not found"));
    //     user.getRoles().add(Role.MANAGER);
    //     appUserRepository.save(user);
    // }

    // @PreAuthorize("hasRole('ADMIN')")
    // @Transactional
    // public void promoteToAdmin(Long userId) {
    //     MyAppUser user = appUserRepository.findById(userId)
    //         .orElseThrow(() -> new RuntimeException("User not found"));
    //     user.getRoles().add(Role.ADMIN);
    //     appUserRepository.save(user);
    }