package com.github.genraven.gradlejavaserver.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class Modifier {
    private Type type;
    private int ranks;

    @AllArgsConstructor
    @Getter
    public enum Type {
        INCREASE_ENCUMBRANCE_CAPACITY("Increase Encumbrance Capacity"),
        INCREASE_BASE_ENCUMBRANCE_CAPACITY("Increase Base Encumbrance Capacity"),
        INCREASE_WOUND_THRESHOLD("Increase Wound Threshold"),
        SUFFER_WOUNDS("Suffer Wounds"),
        SUFFER_WOUNDS_BY_TALENT("Suffer Wounds By Talent"),
        INCREASE_CRITICAL_INJURY("Increase Critical Injury"),
        DECREASE_CRITICAL_INJURY("Decrease Critical Injury"),
        RESET_CRITICAL_INJURY("Reset Critical Injury");

        @JsonValue
        private final String label;
    }
}
