package com.github.genraven.genesys.domain.campaign;

import lombok.Data;

@Data
public class Scene {
    protected Scene() {
    }

    public Scene(final String name) {
        this.name = name;
    }
    private String name;
    private Party party;
}
