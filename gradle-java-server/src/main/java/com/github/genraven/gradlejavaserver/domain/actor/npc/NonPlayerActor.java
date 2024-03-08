package com.github.genraven.gradlejavaserver.domain.actor.npc;

import com.github.genraven.gradlejavaserver.domain.Ability;
import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class NonPlayerActor extends Actor {

    protected NonPlayerActor() {}

    public NonPlayerActor(final Actor actor) {
        this.setName(actor.getName());
        this.setBrawn(actor.getBrawn());
        this.setAgility(actor.getAgility());
        this.setIntellect(actor.getIntellect());
        this.setCunning(actor.getCunning());
        this.setWillpower(actor.getWillpower());
        this.setPresence(actor.getPresence());
        this.setWounds(actor.getWounds());
        this.setSettings(actor.getSettings());
    }

    private int combat = 1;
    private int social = 1;
    private int general = 1;
    private List<Ability> abilities = new ArrayList<>();
}
