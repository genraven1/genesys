package com.github.genraven.gradlejavaserver.domain.character;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class StatusEffect {

    protected StatusEffect() {}

    public StatusEffect(final Type type) {
        this.type = type;
    }

    private Type type;
    private int rounds = 0;

    @Getter
    @AllArgsConstructor
    public enum Type {
        DISORIENTED("Disoriented"),
        IMMOBILIZED("Immobilized"),
        STAGGERED("Staggered");

        @JsonValue
        private final String label;
    }
}
