package com.github.genraven.genesys.model.actor.characteristic;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum CharacteristicType {
    BRAWN("Brawn"),
    AGILITY("Agility"),
    INTELLIGENT("Intelligent"),
    CUNNING("Cunning"),
    WILLPOWER("Willpower"),
    PRESENCE("Presence");

    @JsonValue
    private final String label;
}
