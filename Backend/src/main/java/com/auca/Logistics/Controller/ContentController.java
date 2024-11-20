package com.auca.Logistics.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;





@Controller
public class ContentController {

    @GetMapping("/index")
    public String Index() {
        return "index";
    }
    

    @GetMapping("/login")
    public String login(){
        return  "login";
    }  

    @GetMapping("/drivercreate")
    public String createdriver(){
        return  "drivercreate";
    } 

    @GetMapping("/driverEdit")
    public String editdriver(){
        return  "driverEdit";
    } 

    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }


    @GetMapping("shipments/index")
    public String shipmentshome(){
        return "shipments/index";
    }
    

    
    
}
