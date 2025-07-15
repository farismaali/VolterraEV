package com.volterraev.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CheckoutOrderDto {
    private String creditCardNumber;
    private String cardHolderName;
    private String shippingAddress;
    private Double totalAmount;
}
