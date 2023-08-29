package com.github.genraven.genesys.model.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Type {
    NEMESIS("Nemesis"),
    RIVAL("Rival"),
    MINION("Minion"),
    PLAYER("Player");

    @JsonValue
    private final String label;
}
