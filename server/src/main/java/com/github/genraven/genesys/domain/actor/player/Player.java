package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.Actor;

import com.github.genraven.genesys.domain.actor.ActorTalent;
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
        this.setSoak(actor.getSoak());
        this.setWeapons(actor.getWeapons());
        this.setArmors(actor.getArmors());
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
