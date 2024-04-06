package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SocialModifier implements ModifierType {
    ADD_SETBACK_ON_TARGETED_SOCIAL("Add Setback on Targeted Social");

    @JsonValue
    private final String label;
}
