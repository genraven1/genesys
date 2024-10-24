package com.github.genraven.genesys.domain.actor.npc;

import com.github.genraven.genesys.domain.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class GroupTalent extends Talent {
    private boolean group;
}
