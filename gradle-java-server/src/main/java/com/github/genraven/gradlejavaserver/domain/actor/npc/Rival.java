package com.github.genraven.gradlejavaserver.domain.actor.npc;

import com.github.genraven.gradlejavaserver.domain.CriticalInjury;
import com.github.genraven.gradlejavaserver.domain.actor.ActorType;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "rivals")
public class Rival extends SingleNonPlayerActor {

    protected Rival() {}

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
        this.setSettings(singleNonPlayerActor.getSettings());
        this.setCombat(singleNonPlayerActor.getCombat());
        this.setSocial(singleNonPlayerActor.getSocial());
        this.setGeneral(singleNonPlayerActor.getGeneral());
        this.setAbilities(singleNonPlayerActor.getAbilities());
        this.setSkills(singleNonPlayerActor.getSkills());
        this.setTalents(singleNonPlayerActor.getTalents());
        this.setWeapons(singleNonPlayerActor.getWeapons());
    }
}
