package com.github.genraven.genesys.domain.modifier;

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
        DEFAULT("Default"),
        //Critical Injury
        DECREASE_CRITICAL_INJURY("Decrease Critical Injury"),
        INCREASE_CRITICAL_INJURY("Increase Critical Injury"),
        RESET_CRITICAL_INJURY("Reset Critical Injury"),
        //Strain
        SUFFER_STRAIN("Suffer Strain"),
        //Defense
        INCREASE_MELEE_DEFENSE("Increase Melee Defense"),
        INCREASE_RANGED_DEFENSE("Increase Ranged Defense");

        @JsonValue
        private final String label;
    }
}
