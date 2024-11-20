package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.auca.Logistics.Model.MyAppUser;
import com.auca.Logistics.Model.Role;
import com.auca.Logistics.Service.AdminService;

@Controller
@RequestMapping("/admin")
@PreAuthorize("hasRole('ADMIN')") 
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PutMapping("/assign-role/{userId}")
    public MyAppUser assignRole(@PathVariable Long userId, @RequestParam Role role) {
        return adminService.assignRoleToUser(userId, role);
    }
}