package com.github.genraven.gradlejavaserver.domain.actor.player;

import com.github.genraven.gradlejavaserver.domain.actor.ActorSkill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class PlayerSkill extends ActorSkill {

    public PlayerSkill(final ActorSkill skill) {
        this.setName(skill.getName());
        this.setId(skill.getId());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setSettings(skill.getSettings());
        this.setRanks(skill.getRanks());
        this.career = false;
    }

    private boolean career;
}
