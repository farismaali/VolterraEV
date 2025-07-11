package com.volterraev.repository;

import com.volterraev.model.CarCondition;
import com.volterraev.model.Vehicle;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
    List<Vehicle> findByCondition(CarCondition condition);
}
