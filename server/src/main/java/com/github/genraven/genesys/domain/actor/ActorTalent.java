package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.Talent;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorTalent extends Talent {

    protected ActorTalent() {}

    public ActorTalent(final Talent talent) {
        this.setName(talent.getName());
        this.setActivation(talent.getActivation());
        this.setRanked(talent.isRanked());
        this.setTier(talent.getTier());
        this.setDescription(talent.getDescription());
        this.setSummary(talent.getSummary());
    }

    private int ranks = 1;
}
