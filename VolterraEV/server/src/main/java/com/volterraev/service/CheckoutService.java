package com.volterraev.service;

import com.volterraev.model.CheckoutOrder;
import com.volterraev.repository.CheckoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CheckoutService {

    @Autowired
    private CheckoutRepository checkoutRepository;

    public CheckoutOrder placeOrder(CheckoutOrder order) {
        return checkoutRepository.save(order); 
    }
}