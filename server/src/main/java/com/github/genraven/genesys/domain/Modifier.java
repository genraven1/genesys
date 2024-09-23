package com.github.genraven.genesys.domain;

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
        DECREASE_CRITICAL_INJURY("Decrease Critical Injury");

        @JsonValue
        private final String label;
    }
}
