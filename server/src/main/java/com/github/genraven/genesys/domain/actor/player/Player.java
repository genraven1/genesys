package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.Actor;

import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.modifier.Modifier;
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
    private Experience experience = new Experience();
    private Career career = new Career();
    private Archetype archetype = new Archetype();
    private List<ActorTalent> talents = new ArrayList<>();
    private List<PlayerSkill> skills = new ArrayList<>();
    private List<CriticalInjury> injuries = new ArrayList<>();

    public void getTotalSoak() {
        int soak = getBrawn();
        soak += getArmors().stream().filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY)).mapToInt(Armor::getSoak).sum();
        for (ActorTalent talent : getTalents()) {
            for (Modifier modifier : talent.getModifiers()) {
                if (modifier.getType().equals(Modifier.Type.INCREASE_SOAK)) {
                    soak = talent.isRanked() ? soak + modifier.getRanks() * talent.getRanks() : soak + modifier.getRanks();
                }
            }
        }
        this.setSoak(soak);
    }
}
