package com.volterraev.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
public class Vehicle {
    public Vehicle() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long vid;

    @NotNull
    @Column(nullable = false)
    private Double price;

    @NotNull
    @Column(nullable = false)
    private int mileage;

    @NotNull
    @Column(nullable = false)
    private Integer year;

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

    @NotNull(message = "Shape must be specified")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CarShape shape;

    @Column(name = "is_hot_deal")
    private boolean isHotDeal;

    @OneToMany(mappedBy = "vehicle", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<AccidentHistory> accidentHistories = new ArrayList<>();

}
