package com.github.genraven.gradlejavaserver.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Difficulty {
    EASY("Easy"),
    AVERAGE("Average"),
    HARD("Hard"),
    DAUNTING("Daunting"),
    FORMIDABLE("Formidable");

    @JsonValue
    private final String label;
}
