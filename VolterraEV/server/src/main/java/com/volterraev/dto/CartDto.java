package com.volterraev.dto;

public class CartDto {
    private Long userId;
    private Long vehicleId;
    private int quantity;

    public CartDto() {}

    public CartDto(Long userId, Long vehicleId, int quantity) {
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.quantity = quantity;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
