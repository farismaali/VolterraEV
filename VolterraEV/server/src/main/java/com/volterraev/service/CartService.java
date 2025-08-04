package com.volterraev.service;

import com.volterraev.model.Cart;
import com.volterraev.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart addToCart(String userId, Long vehicleId, int quantity) {
        Optional<Cart> existing = cartRepository.findByUserIdAndVehicleId(userId, vehicleId);

        if (existing.isPresent()) {
            Cart item = existing.get();
            item.setQuantity(item.getQuantity() + quantity);
            return cartRepository.save(item);
        }

        Cart newItem = new Cart(userId, vehicleId, quantity);
        return cartRepository.save(newItem);
    }

    public List<Cart> getUserCart(String userId) {
        return cartRepository.findByUserId(userId);
    }

    public void removeFromCart(String userId, Long vehicleId) {
        cartRepository.deleteByUserIdAndVehicleId(userId, vehicleId);
    }

    public void clearCart(String userId) {
        List<Cart> items = cartRepository.findByUserId(userId);
        cartRepository.deleteAll(items);
    }
}
