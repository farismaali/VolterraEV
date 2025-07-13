package com.volterraev.repository;

import com.volterraev.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserId(Long userId);
    Optional<Cart> findByUserIdAndVehicleId(Long userId, Long vehicleId);
    void deleteByUserIdAndVehicleId(Long userId, Long vehicleId);
}
