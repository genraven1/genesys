package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.CriticalInjury;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import com.github.genraven.genesys.domain.actor.ActorTalent;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SingleNonPlayerActor extends NonPlayerActor {

    protected SingleNonPlayerActor() {}

    public SingleNonPlayerActor(final NonPlayerActor nonPlayerActor) {
        this.setName(nonPlayerActor.getName());
        this.setBrawn(nonPlayerActor.getBrawn());
        this.setAgility(nonPlayerActor.getAgility());
        this.setIntellect(nonPlayerActor.getIntellect());
        this.setCunning(nonPlayerActor.getCunning());
        this.setWillpower(nonPlayerActor.getWillpower());
        this.setPresence(nonPlayerActor.getPresence());
        this.setWounds(nonPlayerActor.getWounds());
        this.setCombat(nonPlayerActor.getCombat());
        this.setSocial(nonPlayerActor.getSocial());
        this.setGeneral(nonPlayerActor.getGeneral());
        this.setAbilities(nonPlayerActor.getAbilities());
    }

    private List<ActorTalent> talents = new ArrayList<>();
    private List<ActorSkill> skills = new ArrayList<>();
    private List<CriticalInjury> injuries = new ArrayList<>();
}
