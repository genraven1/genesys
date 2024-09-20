package com.github.genraven.gradlejavaserver.domain.actor.player;

import com.github.genraven.gradlejavaserver.domain.CriticalInjury;
import com.github.genraven.gradlejavaserver.domain.actor.Actor;

import com.github.genraven.gradlejavaserver.domain.actor.ActorTalent;
import com.github.genraven.gradlejavaserver.domain.actor.ActorType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "players")
public class Player extends Actor {

    protected Player() {}

    public Player(final Actor actor) {
        this.setName(actor.getName());
        this.setType(ActorType.PLAYER);
        this.setBrawn(actor.getBrawn());
        this.setAgility(actor.getAgility());
        this.setIntellect(actor.getIntellect());
        this.setCunning(actor.getCunning());
        this.setWillpower(actor.getWillpower());
        this.setPresence(actor.getPresence());
        this.setWounds(actor.getWounds());
        this.setWeapons(actor.getWeapons());
        this.setSettings(actor.getSettings());
    }
    private int strain = 1;
    private int encumbrance = 5 + getBrawn();
    private Experience experience;
    private Career career;
    private Archetype archetype;
    private List<ActorTalent> talents = new ArrayList<>();
    private List<PlayerSkill> skills = new ArrayList<>();
    private List<CriticalInjury> injuries = new ArrayList<>();
}
