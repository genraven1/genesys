package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SoakModifier implements ModifierType {
    INCREASE_SOAK("Increase Soak");

    @JsonValue
    private final String label;
}
