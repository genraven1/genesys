package com.github.genraven.gradlejavaserver.domain.actor;


import com.github.genraven.gradlejavaserver.domain.Setting;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Actor {

    protected Actor() {}

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
