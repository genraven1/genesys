package com.github.genraven.gradlejavaserver.domain.spell;

import lombok.Data;

@Data
public class Effect {
    private String name;
    private String description;
    private int increase = 0;
}
