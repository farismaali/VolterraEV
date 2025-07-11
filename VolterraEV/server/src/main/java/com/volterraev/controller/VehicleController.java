package com.volterraev.controller;

import com.volterraev.model.CarCondition;
import com.volterraev.model.Vehicle;
import com.volterraev.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/vehicles")
public class VehicleController {
    private VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public Iterable<Vehicle> getVehicles(@RequestParam(required = false) String condition) {
        if (condition != null) {
            try {
                CarCondition carCondition = CarCondition.valueOf(condition.toUpperCase());
                return vehicleService.getVehicleByCondition(carCondition);
            } catch (IllegalArgumentException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid car condition: " + condition);
            }
        }
        return vehicleService.getAllVehicle();
    }



    @PostMapping
    public ResponseEntity<Vehicle> saveVehicle(@Valid @RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
    }
}
