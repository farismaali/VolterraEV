package com.volterraev.repository;

import com.volterraev.model.AccidentHistory;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AccidentRepository extends CrudRepository<AccidentHistory, Long> {
    List<AccidentHistory> findByVehicleVid(Long vehicleId);

}
