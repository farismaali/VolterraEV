package com.volterraev.dto;

import com.volterraev.model.CarShape;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VehicleDto {
    private String brand;
    private Double price;
    private String description;
    private String model;
    private int year;
    private CarShape shape;
}