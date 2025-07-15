package com.volterraev.repository;

import com.volterraev.model.CheckoutOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CheckoutRepository extends JpaRepository<CheckoutOrder, Long> {
}