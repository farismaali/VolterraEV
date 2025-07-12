package com.volterraev.service;

import com.volterraev.dto.AccidentRequestDto;
import com.volterraev.dto.VehicleDto;
import com.volterraev.model.AccidentHistory;
import com.volterraev.model.CarShape;
import com.volterraev.model.Vehicle;
import com.volterraev.repository.AccidentRepository;
import com.volterraev.repository.VehicleRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {
    private VehicleRepository vehicleRepository;
    private AccidentRepository accidentRepository ;

    public VehicleService(VehicleRepository vehicleRepository, AccidentRepository accidentRepository) {
        this.vehicleRepository = vehicleRepository;
        this.accidentRepository = accidentRepository;
    }

    public Iterable<Vehicle> getAllVehicle() {
        return vehicleRepository.findAll();
    }

    public Vehicle updateVehicle(Long id, VehicleDto dto) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Vehicle not found"));

        vehicle.setBrand(dto.getBrand());
        vehicle.setPrice(dto.getPrice());
        vehicle.setDescription(dto.getDescription());
        vehicle.setModel(dto.getModel());
        vehicle.setYear(dto.getYear());
        vehicle.setShape(dto.getShape());
        Vehicle saved = vehicleRepository.save(vehicle);
        return vehicleRepository.save(saved);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    public AccidentHistory addAccident(Long vid, AccidentRequestDto info) {
        Vehicle vehicle = vehicleRepository.findById(vid)
                .orElseThrow(() -> new EntityNotFoundException("Vehicle doesn't exist!"));
        AccidentHistory accident = new AccidentHistory();
        accident.setAccidentDate(info.getAccidentDate());
        accident.setDescription(info.getDescription());
        accident.setVehicle(vehicle);

        return accidentRepository.save(accident);
    }

    public List<AccidentHistory> getAccidentsByVehicleId(Long vid) {
        return accidentRepository.findByVehicleVid(vid);
    }
}
