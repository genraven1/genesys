package com.github.genraven.genesys.model.actor;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Characteristic {
    BRAWN("Brawn"),
    AGILITY("Agility"),
    INTELLIGENT("Intelligent"),
    CUNNING("Cunning"),
    WILLPOWER("Willpower"),
    PRESENCE("Presence");

    private final String label;
}
