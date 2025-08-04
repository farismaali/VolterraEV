package com.volterraev.repository;

import com.volterraev.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(String userId);
    Optional<Cart> findByUserIdAndVehicleId(String userId, Long vehicleId);
    void deleteByUserIdAndVehicleId(String userId, Long vehicleId);
}
