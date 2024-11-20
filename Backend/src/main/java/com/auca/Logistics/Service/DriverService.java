package com.auca.Logistics.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auca.Logistics.Model.Driver;
import com.auca.Logistics.Model.DriverRepository;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public Driver findById(int id) {
        return driverRepository.findById(id).orElse(null);
    }

    public void saveOrUpdateDriver(Driver driver) {
        driverRepository.save(driver);
    }

    public void updateDriver(Driver driver) {
        driverRepository.save(driver);
    }
}
