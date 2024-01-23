package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.Setting;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class Actor {

    public Actor (final String name) {
        this.name = name;
    }

    private String name;
    private ActorType type;
    private int brawn;
    private int agility;
    private int intellect;
    private int cunning;
    private int willpower;
    private int presence;
    private int soak;
    private int melee;
    private int ranged;
    private int wounds;
    private List<Setting> settings;
}
