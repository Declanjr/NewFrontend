package com.auca.Logistics.Service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.auca.Logistics.Model.Driver;
import com.auca.Logistics.Model.DriverRepository;

@Service
public class DriverService {

    @Autowired
    private DriverRepository driverRepository;

    public Driver findById(int  id) {
        return driverRepository.findById(id).orElse(null); 
    }

    public void saveOrUpdateDriver(Driver driver, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
            // Set file name and file data as byte array
            driver.setFileName(file.getOriginalFilename());
            driver.setFileData(file.getBytes());
        }
        driverRepository.save(driver);  //Save Driver with file
    }

    public void updateDriver(Driver driver) {
        driverRepository.save(driver); // Save the updated driver
    }

    public Resource loadFile(int driverId) {
    Driver driver = findById(driverId);
    if (driver != null && driver.getFileData() != null) {
        return new ByteArrayResource(driver.getFileData());
    }
    return null;
}
}

