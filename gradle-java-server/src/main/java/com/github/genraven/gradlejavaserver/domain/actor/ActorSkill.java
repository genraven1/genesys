package com.github.genraven.gradlejavaserver.domain.actor;

import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
public class ActorSkill extends Skill {

    public ActorSkill(final Skill skill) {
        this.setName(skill.getName());
        this.setId(skill.getId());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setSettings(skill.getSettings());
        this.ranks = 0;
    }

    private int ranks;
}
