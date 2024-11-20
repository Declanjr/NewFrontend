package com.auca.Logistics.Model;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface  DriverRepository extends JpaRepository<Driver , Integer>{

   public Driver findByfirstName(String firstName);


}
    
