package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "minions")
public class Minion extends NonPlayerActor {

    protected Minion() {}

    public Minion(final NonPlayerActor nonPlayerActor) {
        this.setName(nonPlayerActor.getName());
        this.setType(ActorType.MINION);
        this.setBrawn(nonPlayerActor.getBrawn());
        this.setAgility(nonPlayerActor.getAgility());
        this.setIntellect(nonPlayerActor.getIntellect());
        this.setCunning(nonPlayerActor.getCunning());
        this.setWillpower(nonPlayerActor.getWillpower());
        this.setPresence(nonPlayerActor.getPresence());
        this.setWounds(nonPlayerActor.getWounds());
        this.setSoak(nonPlayerActor.getSoak());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setAbilities(nonPlayerActor.getAbilities());
        this.setWeapons(nonPlayerActor.getWeapons());
    }

    private List<GroupSkill> skills = new ArrayList<>();

    public void getTotalSoak() {
        int soak = getBrawn().getCurrent();
        soak += getArmors().stream().filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY)).mapToInt(Armor::getSoak).sum();
        this.setSoak(soak);
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
