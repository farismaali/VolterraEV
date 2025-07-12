package com.volterraev.repository;

import com.volterraev.model.AccidentHistory;
import com.volterraev.model.CarShape;
import com.volterraev.model.Vehicle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
    List<Vehicle> findByShape(CarShape condition);
}
