package com.auca.Logistics.Controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.auca.Logistics.Model.Driver;
import com.auca.Logistics.Model.DriverDto;
import com.auca.Logistics.Model.DriverRepository;
import com.auca.Logistics.Service.DriverService;

@Controller
@RequestMapping("/StaffDriver")
public class DriverController {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private DriverService driverService;

    @GetMapping({"", "/"})
    public String getDrivers(Model model) {
        var drivers = driverRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        model.addAttribute("drivers", drivers);
        return "StaffDriver";
    }

    @GetMapping("/drivercreate")
    public String createDriver(Model model) {
        DriverDto driverCreate = new DriverDto();
        model.addAttribute("driverCreate", driverCreate);
        return "CreateDriver";
    }

    @PostMapping("/drivercreate")
public String createDriver(
    @ModelAttribute DriverDto driverCreate,
    BindingResult result,
    @RequestParam("file") MultipartFile file // Add this parameter for the file upload
) {
    if (!file.isEmpty()) {
        try {
            // Set file data and file name in Driver object
            driverCreate.setFileData(file.getBytes());
            driverCreate.setFileName(file.getOriginalFilename());
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception as necessary
        }
    }
    Driver driver = new Driver();
    driver.setFirstName(driverCreate.getFirstName());
    driver.setLastName(driverCreate.getLastName());
    driver.setPhone(driverCreate.getPhone());
    driver.setAddress(driverCreate.getAddress());
    driver.setGender(driverCreate.getGender());
    driver.setFileData(driverCreate.getFileData());
    driver.setFileName(driverCreate.getFileName());

    driverRepository.save(driver);

    return "redirect:/StaffDriver";
}

    @GetMapping("/driverEdit")
    public String editDriver(Model model, @RequestParam int id) {
        Driver driver = driverRepository.findById(id).orElse(null);
        if (driver == null) {
            return "redirect:/StaffDriver";
        }

        DriverDto driverDto = new DriverDto();
        driverDto.setFirstName(driver.getFirstName());
        driverDto.setLastName(driver.getLastName());
        driverDto.setPhone(driver.getPhone());
        driverDto.setAddress(driver.getAddress());
        driverDto.setGender(driver.getGender());

        model.addAttribute("driver", driver);
        model.addAttribute("driverDto", driverDto);

        return "driverEdit";
    }

    @PostMapping("/driverEdit")
    public String editDriver(
        Model model,
        @RequestParam int id,
        @ModelAttribute DriverDto driverDto,
        BindingResult result,
        @RequestParam("file") MultipartFile file
    ) {
        Driver driver = driverRepository.findById(id).orElse(null);
        if (driver == null) {
            return "redirect:/StaffDriver";
        }

        if (result.hasErrors()) {
            model.addAttribute("driver", driver);
            return "driverEdit";
        }

        driver.setFirstName(driverDto.getFirstName());
        driver.setLastName(driverDto.getLastName());
        driver.setPhone(driverDto.getPhone());
        driver.setAddress(driverDto.getAddress());
        driver.setGender(driverDto.getGender());

        try {
            driverService.saveOrUpdateDriver(driver, file); // Update driver with new file
        } catch (IOException e) {
            e.printStackTrace();
        }

        return "redirect:/StaffDriver";
    }

    @GetMapping("/driverDelete")
    public String deleteDriver(@RequestParam int id) {
        driverRepository.deleteById(id);
        return "redirect:/StaffDriver";
    }

    @GetMapping("/driverFile")
public ResponseEntity<Resource> downloadDriverFile(@RequestParam int id) {
    Resource file = driverService.loadFile(id);
    if (file == null) {
        return ResponseEntity.notFound().build();
    }

    // Set response headers for file download
    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + driverService.findById(id).getFileName() + "\"")
        .body(file);
}
}
