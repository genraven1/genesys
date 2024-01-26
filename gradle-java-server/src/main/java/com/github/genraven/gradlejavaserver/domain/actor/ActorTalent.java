package com.github.genraven.gradlejavaserver.domain.actor;

import com.github.genraven.genesys.domain.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorTalent extends Talent {
    public ActorTalent(final String name) {
        super(name);
    }

    private int ranks;
}
