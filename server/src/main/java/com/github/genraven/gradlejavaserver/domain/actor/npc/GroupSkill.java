package com.github.genraven.gradlejavaserver.domain.actor.npc;

import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupSkill extends Skill {
    private boolean group;
}
