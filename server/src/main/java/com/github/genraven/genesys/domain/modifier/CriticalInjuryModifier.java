package com.github.genraven.genesys.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CriticalInjuryModifier implements ModifierType {
    DECREASE_CRITICAL_INJURY("Decrease Critical Injury"),
    INCREASE_CRITICAL_INJURY("Increase Critical Injury"),
    RESET_CRITICAL_INJURY("Reset Critical Injury"),;

    @JsonValue
    private final String label;
}
