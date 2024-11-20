package com.auca.Logistics.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.auca.Logistics.Model.ShipmentDto;
import com.auca.Logistics.Model.Shipments;
import com.auca.Logistics.Model.ShipmentsRepository;




@Controller
@RequestMapping("/shipments")
public class ShipmentController {

    @Autowired
    private ShipmentsRepository shipmentRepo;

    @GetMapping("shipments/index")
    public String getShipments(Model model) {
        var shipments = shipmentRepo.findAll(Sort.by(Sort.Direction.DESC,"id"));
        model.addAttribute("shipments", shipments);
        return "shipments/index";
    }

    @GetMapping("/create")
    public String createshipments(Model model) {
        ShipmentDto shipmentDto = new ShipmentDto();
        model.addAttribute("shipmentDto", shipmentDto);

        return "shipments/create";
    }
    
    @PostMapping("/create")
    public String createShipments(
        @ModelAttribute ShipmentDto shipmentDto,
        BindingResult result
    ) {

        Shipments shipments = new  Shipments();
        shipments.setContent(shipments.getContent());
        shipments.setSender(shipments.getSender());
        shipments.setReceiver(shipments.getReceiver());
        shipments.setArrivaldestination(shipments.getArrivaldestination());
        shipments.setDeparturedestination(shipments.getDeparturedestination());
        shipments.setArrivaldate(shipments.getArrivaldate());
        shipments.setDeparturedate(shipments.getDeparturedate());
        shipments.setStatus(shipments.getStatus());
        shipments.setCost(shipments.getCost());
        shipments.setDriver(shipments.getDriver());

        shipmentRepo.save(shipments);
        return "redirect:/index";
    }
    
    
     @GetMapping("/edit")
    public String editDriver(Model model, @RequestParam long  id) {

        Shipments shipments = shipmentRepo.findById(id).orElse(null);
        if(shipments == null){
            return "redirect:/shipments";
        }

       ShipmentDto shipmentDto = new ShipmentDto();
       shipmentDto.setContent(shipments.getContent());
       shipmentDto.setSender(shipments.getSender());
       shipmentDto.setReceiver(shipments.getReceiver());
       shipmentDto.setArrivaldestination(shipments.getArrivaldestination());
       shipmentDto.setDeparturedestination(shipments.getDeparturedestination());
       shipmentDto.setArrivaldate(shipments.getArrivaldate());
       shipmentDto.setDeparturedate(shipments.getDeparturedate());
       shipmentDto.setStatus(shipments.getStatus());
       shipmentDto.setCost(shipments.getCost());
       shipmentDto.setDriver(shipments.getDriver());

        model.addAttribute("shipments",shipments);
        model.addAttribute("shipmentDto", shipmentDto);

        return "shipments/edit";
    }

     @PostMapping("/edit")
    public String editshipments(
        Model model,
        @RequestParam long  id,
        @ModelAttribute ShipmentDto shipmentDto,
        BindingResult result
        ) {

            Shipments shipments = shipmentRepo.findById(id).orElse(null);
            if (shipments == null){
                return "redirect:/shipments";
            }

            model.addAttribute("shipments", shipments);

            if(result.hasErrors()){
                return "shipments/edit";
            }

            shipments.setContent(shipmentDto.getContent());
            shipments.setSender(shipmentDto.getSender());
            shipments.setReceiver(shipmentDto.getReceiver());
            shipments.setArrivaldestination(shipmentDto.getArrivaldestination());
            shipments.setDeparturedestination(shipmentDto.getDeparturedestination());
            shipments.setArrivaldate(shipmentDto.getArrivaldate());
            shipments.setDeparturedate(shipmentDto.getDeparturedate());
            shipments.setStatus(shipmentDto.getStatus());
            shipments.setCost(shipmentDto.getCost());
            shipments.setDriver(shipmentDto.getDriver());
            shipmentRepo.save(shipments);

        return "redirect:/shipments";
    }

    @GetMapping("/delete")
    public String deleteshipment(@RequestParam long  id) {
        shipmentRepo.deleteById(id);
        return "redirect:/shipments";
    }

    
}
