package com.volterraev.controller;

import com.volterraev.dto.CartDto;
import com.volterraev.model.Cart;
import com.volterraev.service.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody CartDto dto) {
        Cart item = cartService.addToCart(dto.getUserId(), dto.getVehicleId(), dto.getQuantity());
        System.out.println("Received user ID: " + dto.getUserId());
        System.out.println("Received vehicle ID: " + dto.getVehicleId());
        return ResponseEntity.ok(item);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Cart>> getCart(@PathVariable String userId) {
        return ResponseEntity.ok(cartService.getUserCart(userId));
    }

    @DeleteMapping("/remove")
    public ResponseEntity<Void> removeFromCart(@RequestBody CartDto dto) {
        cartService.removeFromCart(dto.getUserId(), dto.getVehicleId());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
