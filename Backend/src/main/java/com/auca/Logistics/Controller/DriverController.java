package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auca.Logistics.Model.Driver;
import com.auca.Logistics.Model.DriverDto;
import com.auca.Logistics.Model.DriverRepository;

@RestController
@RequestMapping("/Driver")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    @PostMapping("/create-driver")
    public ResponseEntity<?> createDriver(@RequestBody DriverDto driverDto) {
        try {
            Driver driver = new Driver();
            driver.setFirstName(driverDto.getFirstName());
            driver.setLastName(driverDto.getLastName());
            driver.setPhone(driverDto.getPhone());
            driver.setAddress(driverDto.getAddress());
            driver.setGender(driverDto.getGender());

            Driver savedDriver = driverRepository.save(driver);
            return ResponseEntity.ok(savedDriver);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating driver: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllDrivers() {
        try {
            return ResponseEntity.ok(driverRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching drivers: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getDriver(@PathVariable int id) {
        return driverRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateDriver(@PathVariable int id, @RequestBody DriverDto driverDto) {
        try {
            return driverRepository.findById(id)
                .map(driver -> {
                    driver.setFirstName(driverDto.getFirstName());
                    driver.setLastName(driverDto.getLastName());
                    driver.setPhone(driverDto.getPhone());
                    driver.setAddress(driverDto.getAddress());
                    driver.setGender(driverDto.getGender());
                    Driver updatedDriver = driverRepository.save(driver);
                    return ResponseEntity.ok(updatedDriver);
                })
                .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating driver: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteDriver(@PathVariable int id) {
        try {
            if (!driverRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            driverRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting driver: " + e.getMessage());
        }
    }
}