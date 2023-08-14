package com.github.genraven.genesys.model.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Activation {
    PASSIVE("Passive");

    @JsonValue
    private final String label;
}
