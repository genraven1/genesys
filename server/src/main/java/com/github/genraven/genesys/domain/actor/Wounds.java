package com.github.genraven.genesys.domain.actor;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Wounds {

    protected Wounds() {}

    private int current;
    private int threshold;
}
