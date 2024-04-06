package com.github.genraven.gradlejavaserver.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Ability {

    protected Ability() {}

    public Ability(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private String description;
    private Activation activation;
}
