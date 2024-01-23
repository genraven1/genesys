package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.Setting;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class Actor {

    public Actor (final String name) {
        this.name = name;
    }

    private String name;
    private ActorType type;
    private int brawn = 1;
    private int agility = 1;
    private int intellect = 1;
    private int cunning = 1;
    private int willpower = 1;
    private int presence = 1;
    private int soak;
    private int melee;
    private int ranged;
    private int wounds = 1;
    private List<Setting> settings = new ArrayList<>();
}
