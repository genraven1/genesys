package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Modifier {
    private ModifierType type;
    private int ranks;

    @AllArgsConstructor
    @Getter
    public enum Type {
        DECREASE_CRITICAL_INJURY("Decrease Critical Injury"),
        INCREASE_CRITICAL_INJURY("Increase Critical Injury"),
        SUFFER_STRAIN("Suffer Strain");

        @JsonValue
        private final String label;
    }
}
