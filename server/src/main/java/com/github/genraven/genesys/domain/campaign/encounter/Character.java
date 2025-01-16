package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.*;
import com.github.genraven.genesys.domain.actor.npc.MinionGroup;
import com.github.genraven.genesys.domain.actor.npc.Nemesis;
import com.github.genraven.genesys.domain.actor.npc.Rival;
import com.github.genraven.genesys.domain.actor.player.Player;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Character {

    protected Character() {
    }

    public Character(final Player player) {
        player.getTotalPlayerStats();

        this.setId(player.getId());
        this.setName(player.getName());
        this.setType(player.getType());
        this.setBrawn(player.getBrawn());
        this.setAgility(player.getAgility());
        this.setIntellect(player.getIntellect());
        this.setCunning(player.getCunning());
        this.setWillpower(player.getWillpower());
        this.setPresence(player.getPresence());
        this.setWounds(player.getWounds());
        this.setStrain(player.getStrain());
        this.setSoak(player.getSoak());
        this.setMelee(player.getMelee());
        this.setRanged(player.getRanged());

        this.setWeapons(player.getWeapons());
        this.setArmors(player.getArmors());
        this.setTalents(player.getTalents());
        this.setInjuries(player.getInjuries());
        this.setAbilities(player.getArchetype().getAbilities());
    }

    public Character(final Nemesis nemesis) {
        this.setId(nemesis.getId());
        this.setName(nemesis.getName());
        this.setType(nemesis.getType());
        this.setBrawn(nemesis.getBrawn());
        this.setAgility(nemesis.getAgility());
        this.setIntellect(nemesis.getIntellect());
        this.setCunning(nemesis.getCunning());
        this.setWillpower(nemesis.getWillpower());
        this.setPresence(nemesis.getPresence());
        this.setWounds(nemesis.getWounds());
        this.setStrain(nemesis.getStrain());
    }

    public Character(final Rival rival) {
        this.setId(rival.getId());
        this.setName(rival.getName());
        this.setType(rival.getType());
        this.setBrawn(rival.getBrawn());
        this.setAgility(rival.getAgility());
        this.setIntellect(rival.getIntellect());
        this.setCunning(rival.getCunning());
        this.setWillpower(rival.getWillpower());
        this.setPresence(rival.getPresence());
        this.setWounds(rival.getWounds());
    }

    public Character(final MinionGroup minionGroup) {
        this.setId(minionGroup.getId());
        this.setName(minionGroup.getName());
        this.setType(minionGroup.getType());
        this.setBrawn(minionGroup.getBrawn());
        this.setAgility(minionGroup.getAgility());
        this.setIntellect(minionGroup.getIntellect());
        this.setCunning(minionGroup.getCunning());
        this.setWillpower(minionGroup.getWillpower());
        this.setPresence(minionGroup.getPresence());
        this.setWounds(minionGroup.getWounds());
    }

    private String id;
    private String name;
    private Actor.ActorType type;
    private Characteristic brawn;
    private Characteristic agility;
    private Characteristic intellect;
    private Characteristic cunning;
    private Characteristic willpower;
    private Characteristic presence;
    private Stats wounds;
    private Stats strain;
    private int soak;
    private int melee;
    private int ranged;
    private List<ActorWeapon> weapons;
    private List<ActorArmor> armors;
    private List<Ability> abilities;
    private List<ActorTalent> talents;
    private List<CriticalInjury> injuries;
}
