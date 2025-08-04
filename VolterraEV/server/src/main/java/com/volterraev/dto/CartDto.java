package com.volterraev.dto;

public class CartDto {
    private String userId;
    private Long vehicleId;
    private int quantity;

    public CartDto() {}

    public CartDto(String userId, Long vehicleId, int quantity) {
        this.userId = userId;
        this.vehicleId = vehicleId;
        this.quantity = quantity;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
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
