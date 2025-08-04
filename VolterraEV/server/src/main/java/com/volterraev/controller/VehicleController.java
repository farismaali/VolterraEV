package com.volterraev.controller;

import com.volterraev.dto.AccidentRequestDto;
import com.volterraev.dto.LoanRequestDto;
import com.volterraev.dto.VehicleDto;
import com.volterraev.model.AccidentHistory;
import com.volterraev.model.CarShape;
// import com.volterraev.model.CarShape;
import com.volterraev.model.Vehicle;
import com.volterraev.service.LoanService;
import com.volterraev.service.VehicleService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
// import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    private VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @GetMapping
    public Iterable<Vehicle> getAllVehicles() {
        return vehicleService.getAllVehicle();
    }

    @PostMapping
    public ResponseEntity<Vehicle> saveVehicle(@Valid @RequestBody Vehicle vehicle) {
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        return new ResponseEntity<>(savedVehicle, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteVehicle(@RequestParam String vid) {
        Long id = Long.parseLong(vid);
        vehicleService.deleteVehicle(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/loan")
    public ResponseEntity<Double> calculateLoan(@RequestBody LoanRequestDto loanDto) {
        double result = LoanService.calculateLoan(
                loanDto.getAmount(),
                loanDto.getDownPayment(),
                loanDto.getTerm(),
                Optional.ofNullable(loanDto.getInterestRate()));

        return ResponseEntity.ok(result);
    }

    @PostMapping("accident/{vehicleId}")
    public ResponseEntity<AccidentHistory> addAccidentToVehicle(
            @PathVariable("vehicleId") Long vehicleId,
            @RequestBody AccidentRequestDto accidentDto) {

        AccidentHistory savedAccident = vehicleService.addAccident(vehicleId, accidentDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAccident);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(
            @PathVariable Long id,
            @RequestBody VehicleDto vehicleDto) {

        Vehicle updatedVehicle = vehicleService.updateVehicle(id, vehicleDto);
        return ResponseEntity.ok(updatedVehicle);
    }

    @GetMapping("accident/{vehicleId}")
    public List<AccidentHistory> getAccidentsByVehicleId(@PathVariable("vehicleId") Long vehicleId) {
        return vehicleService.getAccidentsByVehicleId(vehicleId);
    }

    // @GetMapping("/sorted")
    // public ResponseEntity<List<Vehicle>> getSortedVehicles(
    //         @RequestParam(defaultValue = "price") String sortBy,
    //         @RequestParam(defaultValue = "asc") String order) {
    //     return ResponseEntity.ok(vehicleService.getSortedVehicles(sortBy, order));
    // }

    @GetMapping("/filter")
    public ResponseEntity<List<Vehicle>> filterVehicles(
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) Integer year,
            @RequestParam(required = false) CarShape shape,
            @RequestParam(required = false) Boolean isHotDeal, 
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String sortOrder) {
        List<Vehicle> filtered = vehicleService.filterVehicles(brand, model, year, shape, isHotDeal, sortBy, sortOrder);
        return ResponseEntity.ok(filtered);
    }

}
