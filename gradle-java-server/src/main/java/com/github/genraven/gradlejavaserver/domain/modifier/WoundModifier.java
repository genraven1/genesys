package com.github.genraven.gradlejavaserver.domain.modifier;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WoundModifier implements ModifierType {
    INCREASE_WOUND_THRESHOLD("Increase Wound Threshold"),
    SUFFER_WOUNDS("Suffer Wounds"),
    SUFFER_WOUNDS_BY_TALENT("Suffer Wounds By Talent");

    @JsonValue
    private final String label;
}
