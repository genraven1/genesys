package com.github.genraven.genesys.domain.talent;

import com.github.genraven.genesys.domain.Difficulty;
import com.github.genraven.genesys.domain.actor.ActorSkill;
import lombok.Data;

@Data
public class TalentSkillCheck {

    private ActorSkill skill;
    private Difficulty difficulty;
}
