package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorSkill extends Skill {

    protected ActorSkill() {}

    public ActorSkill(final Skill skill) {
        this.setName(skill.getName());
        this.setCharacteristic(skill.getCharacteristic());
        this.setType(skill.getType());
        this.setSettings(skill.getSettings());
    }

    private int ranks = 0;
}
