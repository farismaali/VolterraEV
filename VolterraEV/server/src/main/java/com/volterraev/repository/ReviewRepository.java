package com.volterraev.repository;

import com.volterraev.model.Review;
import com.volterraev.model.Vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByVehicle(Vehicle vehicle);
}
