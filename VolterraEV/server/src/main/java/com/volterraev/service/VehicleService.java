package com.volterraev.service;

import com.volterraev.model.CarCondition;
import com.volterraev.model.Vehicle;
import com.volterraev.repository.VehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    private VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    public Iterable<Vehicle> getAllVehicle() {
        return vehicleRepository.findAll();
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public List<Vehicle> getVehicleByCondition(CarCondition condition) {
        return vehicleRepository.findByCondition(condition);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
