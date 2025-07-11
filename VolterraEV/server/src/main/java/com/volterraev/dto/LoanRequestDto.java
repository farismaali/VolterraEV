package com.volterraev.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoanRequestDto {
    private double amount;
    private double downPayment;
    private int term;
    private Double interestRate;
}
