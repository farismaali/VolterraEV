package com.volterraev.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AccidentRequestDto {
    private LocalDate accidentDate;
    private String description;
}
