package com.github.genraven.gradlejavaserver.domain.actor.npc;

import com.github.genraven.gradlejavaserver.domain.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupTalent extends Talent {
    private boolean group;
}
