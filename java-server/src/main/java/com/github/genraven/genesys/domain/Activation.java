package com.github.genraven.genesys.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Activation {
    PASSIVE("Passive");

    @JsonValue
    private final String label;
}

//ActiveAction = 'Active (Action)',
//ActiveManeuver = 'Active (Maneuver)',
//ActiveIncidental = 'Active (Incidental)',
//ActiveIncidentalOutOfTurn = 'Active (Incidental, Out of Turn)'
