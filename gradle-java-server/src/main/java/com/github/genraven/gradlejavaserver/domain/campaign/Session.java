package com.github.genraven.gradlejavaserver.domain.campaign;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Session {

    protected Session() {
    }

    public Session(final String name) {
        this.name = name;
    }

    private String name;
    private Party party;
    private List<Scene> scenes = new ArrayList<>();
}