package com.github.genraven.gradlejavaserver.domain.campaign;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Session {
    private Party party;
    private List<Scene> scenes = new ArrayList<>();
}
