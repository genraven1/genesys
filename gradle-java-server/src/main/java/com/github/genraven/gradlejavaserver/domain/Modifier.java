package com.github.genraven.gradlejavaserver.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Modifier {
    private Type type;
    private int ranks;

    @AllArgsConstructor
    @Getter
    public enum Type {
        INCREASE_WOUND_THRESHOLD("Increase Wound Threshold"),
        SUFFER_WOUNDS("Suffer Wounds");

        @JsonValue
        private final String label;
    }
}
