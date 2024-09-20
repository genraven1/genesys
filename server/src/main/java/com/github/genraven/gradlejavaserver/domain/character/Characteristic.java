package com.github.genraven.gradlejavaserver.domain.character;

import com.github.genraven.gradlejavaserver.domain.actor.CharacteristicType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Characteristic {
    protected Characteristic() {}
    private CharacteristicType type;
    private int current;
}
