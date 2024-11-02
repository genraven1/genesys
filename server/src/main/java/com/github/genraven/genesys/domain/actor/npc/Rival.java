package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.actor.ActorTalent;
import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.modifier.Modifier;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "rivals")
public class Rival extends SingleNonPlayerActor {

    protected Rival() {
    }

    public Rival(final SingleNonPlayerActor singleNonPlayerActor) {
        this.setName(singleNonPlayerActor.getName());
        this.setType(ActorType.RIVAL);
        this.setBrawn(singleNonPlayerActor.getBrawn());
        this.setAgility(singleNonPlayerActor.getAgility());
        this.setIntellect(singleNonPlayerActor.getIntellect());
        this.setCunning(singleNonPlayerActor.getCunning());
        this.setWillpower(singleNonPlayerActor.getWillpower());
        this.setPresence(singleNonPlayerActor.getPresence());
        this.setWounds(singleNonPlayerActor.getWounds());
        this.setSoak(singleNonPlayerActor.getSoak());
        this.setCombat(singleNonPlayerActor.getCombat());
        this.setSocial(singleNonPlayerActor.getSocial());
        this.setGeneral(singleNonPlayerActor.getGeneral());
        this.setAbilities(singleNonPlayerActor.getAbilities());
        this.setSkills(singleNonPlayerActor.getSkills());
        this.setTalents(singleNonPlayerActor.getTalents());
        this.setWeapons(singleNonPlayerActor.getWeapons());
    }

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
