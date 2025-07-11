package com.volterraev.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;



@Getter
@Setter
@Entity
public class Vehicle {
    public Vehicle() {}
    @Id
    @NotNull(message = "Vehicle ID must not be null")
    private Long vid;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name can't exceed 100 characters")
    @Column(nullable = false, length = 100)
    private String name;

    @Size(max = 500, message = "Description can't exceed 500 characters")
    @Column(length = 500)
    private String description;

    @NotBlank(message = "Brand is required")
    @Size(max = 50, message = "Brand can't exceed 50 characters")
    @Column(nullable = false, length = 50)
    private String brand;

    @NotBlank(message = "Model is required")
    @Size(max = 50, message = "Model can't exceed 50 characters")
    @Column(nullable = false, length = 50)
    private String model;

    @NotNull(message = "Condition must be specified")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CarCondition condition;
}
