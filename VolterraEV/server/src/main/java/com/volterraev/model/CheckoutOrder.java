package com.volterraev.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table (name = "checkout_order")
@Getter
@Setter
public class CheckoutOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 16, nullable = false)
    @NotBlank
    private String creditCardNumber; // NOTE: This should never be stored in production environments.

    @Column(nullable = false)
    @NotBlank
    private String cardHolderName;

    @Column(nullable = false)
    @NotBlank
    private String shippingAddress;

    
    private Double totalAmount;
    
    private LocalDateTime orderDate = LocalDateTime.now();
}