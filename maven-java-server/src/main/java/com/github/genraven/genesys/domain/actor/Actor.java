package com.github.genraven.genesys.domain.actor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Actor {

    public Actor (final String name) {
        this.name = name;
    }

    private String name;
    private ActorType type;
}
