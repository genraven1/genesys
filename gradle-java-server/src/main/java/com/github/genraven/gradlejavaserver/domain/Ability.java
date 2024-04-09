package com.github.genraven.gradlejavaserver.domain;

import com.github.genraven.gradlejavaserver.domain.modifier.Modifier;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Ability {
    private String name;
    private String description;
    private Activation activation;
    private Cost cost;
    private Limit limit;
    private List<Modifier> modifiers = new ArrayList<>();
}
