package com.github.genraven.genesys.domain.campaign.encounter;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;

@Data
public class InitiativeSlot {

    private Type type;
    private Character character;

    @Getter
    @AllArgsConstructor
    public enum Type {
        PLAYER("Player"),
        NPC("NPC");

        @JsonValue
        private final String label;
    }
}
