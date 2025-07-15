package com.volterraev.controller;

import com.volterraev.dto.CheckoutOrderDto;
import com.volterraev.model.CheckoutOrder;
import com.volterraev.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    @Autowired
    private CheckoutService checkoutService;

    @PostMapping
    public ResponseEntity<CheckoutOrder> submitOrder(@RequestBody CheckoutOrderDto dto) {
        CheckoutOrder order = new CheckoutOrder();
        order.setCreditCardNumber(dto.getCreditCardNumber());
        order.setCardHolderName(dto.getCardHolderName());
        order.setShippingAddress(dto.getShippingAddress());
        order.setTotalAmount(dto.getTotalAmount());

        CheckoutOrder savedOrder = checkoutService.placeOrder(order);
        return ResponseEntity.ok(savedOrder);
    }

}