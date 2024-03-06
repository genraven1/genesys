package com.github.genraven.gradlejavaserver.domain.equipment;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EquipmentSlot {
    MAIN_HAND("Main Hand"),
    OFF_HAND("Off Hand"),
    BOTH_HANDS("Both Hands"),
    BODY("Body");

    @JsonValue
    private final String value;
}
