package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum StrainModifier implements ModifierType {
    SUFFER_STRAIN("Suffer Strain");

    @JsonValue
    private final String label;
}
