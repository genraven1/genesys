package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.Actor;

import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.actor.Characteristic;
import com.github.genraven.genesys.domain.actor.Stats;
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
        this.setMelee(actor.getMelee());
        this.setRanged(actor.getRanged());
        this.setWeapons(actor.getWeapons());
        this.setArmors(actor.getArmors());
    }
    private Stats strain = new Stats(0, 1, Stats.Type.STRAIN);
    private int encumbrance;
    private Experience experience = new Experience();
    private Career career = new Career();
    private Archetype archetype = new Archetype();
    private List<ActorTalent> talents = new ArrayList<>();
    private List<PlayerSkill> skills = new ArrayList<>();
    private List<CriticalInjury> injuries = new ArrayList<>();

    public void getTotalSoak() {
        int soak = getBrawn().getCurrent();
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

    public void getTotalEncumbrance() {
        int encumbrance = getBrawn().getCurrent() + 5;
        this.setEncumbrance(encumbrance);
    }

    public void updateAvailableExperience(final int experience) {
        final Experience oldExperience = getExperience();
        oldExperience.setInitial(experience);
        oldExperience.setAvailable(experience);
        oldExperience.setTotal(experience);
        this.experience = oldExperience;
    }

    public void getTotalMeleeDefense() {
        int melee = 0;
        melee += getArmors().stream().filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY)).mapToInt(Armor::getDefense).sum();
        this.setMelee(melee);
    }

    public void getTotalRangedDefense() {
        int ranged = 0;
        ranged += getArmors().stream().filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY)).mapToInt(Armor::getDefense).sum();
        this.setRanged(ranged);
    }
}
