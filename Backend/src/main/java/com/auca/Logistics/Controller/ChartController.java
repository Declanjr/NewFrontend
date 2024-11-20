package com.auca.Logistics.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class ChartController {
    
    @GetMapping("/Charts")
    public String Chart(Model model) {
        model.addAttribute("onTimeDelivery", 98.5);
        model.addAttribute("activeShipments", 247);
        model.addAttribute("averageDeliveryTime", 2.3);
        model.addAttribute("delayedShipments", 12);
        return "Charts";
    }
    
}
