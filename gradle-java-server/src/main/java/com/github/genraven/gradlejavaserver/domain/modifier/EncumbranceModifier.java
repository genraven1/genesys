package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum EncumbranceModifier implements ModifierType {
    INCREASE_ENCUMBRANCE_CAPACITY("Increase Encumbrance Capacity"),
    INCREASE_BASE_ENCUMBRANCE_CAPACITY("Increase Base Encumbrance Capacity");
    @JsonValue
    private final String label;
}
