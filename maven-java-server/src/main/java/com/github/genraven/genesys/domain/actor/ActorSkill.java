package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorSkill extends Skill {
    public ActorSkill(final String name) {
        super(name);
    }

    private int ranks;
}
