package com.volterraev.dto;

import com.volterraev.model.Vehicle;

public class CartResponseDto {
    private Long id;
    private int quantity;
    private Vehicle vehicle;

    public CartResponseDto(Long id, int quantity, Vehicle vehicle) {
        this.id = id;
        this.quantity = quantity;
        this.vehicle = vehicle;
    }

    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }
}
