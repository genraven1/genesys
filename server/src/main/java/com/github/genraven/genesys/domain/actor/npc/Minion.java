package com.github.genraven.genesys.domain.actor.npc;

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

    private List<GroupTalent> talents = new ArrayList<>();
    private List<GroupSkill> skills = new ArrayList<>();

    public void getTotalSoak() {
        int soak = getBrawn();
        soak += getArmors().stream().filter(armor -> armor.getSlot().equals(EquipmentSlot.BODY)).mapToInt(Armor::getSoak).sum();
        for (GroupTalent talent : getTalents()) {
            for (Modifier modifier : talent.getModifiers()) {
                if (modifier.getType().equals(Modifier.Type.INCREASE_SOAK)) {
                    soak += modifier.getRanks();
                }
            }
        }
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
