package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum RangeBand {
    ENGAGED("Engaged"),
    SHORT("Short"),
    MEDIUM("Medium"),
    LONG("Long"),
    EXTREME("Extreme"),
    STRATEGIC("Strategic");

    @JsonValue
    private final String label;
}
