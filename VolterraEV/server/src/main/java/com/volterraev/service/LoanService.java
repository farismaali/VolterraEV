package com.volterraev.service;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

@Getter
@Setter
public class LoanService {
    public static double calculateLoan(double amount, double downPayment, int term, Optional<Double> interestRate) {
        double totalPayable = amount - downPayment;
        double interset = interestRate.orElse(13.0);
        double monthlyRate = (interset / 100 ) / 12;

        if (monthlyRate == 0) {
            return totalPayable / term;
        }

        return (monthlyRate * totalPayable) / (1 - Math.pow(1 + monthlyRate, -term));
    }
}
