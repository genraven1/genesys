package com.github.genraven.gradlejavaserver.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CharacteristicType {
    BRAWN("Brawn"),
    AGILITY("Agility"),
    INTELLECT("Intellect"),
    CUNNING("Cunning"),
    WILLPOWER("Willpower"),
    PRESENCE("Presence");

    @JsonValue
    private final String label;
}
