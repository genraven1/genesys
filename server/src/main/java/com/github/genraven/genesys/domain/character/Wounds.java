package com.github.genraven.genesys.domain.character;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Wounds {

    protected Wounds() {}

    private int wounds;
    private int threshold;
}
