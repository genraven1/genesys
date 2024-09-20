package com.github.genraven.genesys.domain.actor;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ActorType {
    MINION("Minion"),
    RIVAL("Rival"),
    NEMESIS("Nemesis"),
    PLAYER("Player");

    @JsonValue
    private final String label;
}
