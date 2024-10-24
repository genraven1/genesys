package com.github.genraven.genesys.domain.character;

import com.github.genraven.genesys.domain.actor.CharacteristicType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Characteristic {
    protected Characteristic() {}
    private CharacteristicType type;
    private int current;
}
