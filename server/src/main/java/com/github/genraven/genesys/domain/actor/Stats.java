package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
@AllArgsConstructor
public class Stats {

    protected Stats() {}

    private int current;
    private int threshold;
    private Type type;

    @AllArgsConstructor
    @Getter
    public enum Type {
        WOUNDS("Wounds"),
        STRAIN("Strain");

        @JsonValue
        private final String label;
    }
}
