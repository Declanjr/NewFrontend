package com.auca.Logistics.Model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

public class ShipmentDto {

    private String Content;
    private String Sender;
    private String Receiver;
    private String Arrivaldestination;
    private String Departuredestination;
    private Date Departuredate;
    private Date Arrivaldate;
     @Column(columnDefinition = "VARCHAR(255) DEFAULT 'IN TRANSIT'")
    private String Status;
    private int Cost;

    @ManyToOne
    @JoinColumn(name="driver_id")
    private Driver driver;

    public String getContent() {
        return Content;
    }

    public void setContent(String Content) {
        this.Content = Content;
    }

    public String getSender() {
        return Sender;
    }

    public void setSender(String Sender) {
        this.Sender = Sender;
    }

    public String getReceiver() {
        return Receiver;
    }

    public void setReceiver(String Receiver) {
        this.Receiver = Receiver;
    }

    public String getArrivaldestination() {
        return Arrivaldestination;
    }

    public void setArrivaldestination(String Arrivaldestination) {
        this.Arrivaldestination = Arrivaldestination;
    }

    public String getDeparturedestination() {
        return Departuredestination;
    }

    public void setDeparturedestination(String Departuredestination) {
        this.Departuredestination = Departuredestination;
    }

    public Date getDeparturedate() {
        return Departuredate;
    }

    public void setDeparturedate(Date Departuredate) {
        this.Departuredate = Departuredate;
    }

    public Date getArrivaldate() {
        return Arrivaldate;
    }

    public void setArrivaldate(Date Arrivaldate) {
        this.Arrivaldate = Arrivaldate;
    }

    public String getStatus() {
        return Status;
    }

    public void setStatus(String Status) {
        this.Status = Status;
    }

    public int getCost() {
        return Cost;
    }

    public void setCost(int Cost) {
        this.Cost = Cost;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }
    
}
