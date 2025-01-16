package com.github.genraven.genesys.domain.campaign.encounter;

import com.github.genraven.genesys.domain.actor.Actor;
import lombok.Data;

@Data
public class Character {

    private String id;
    private String name;
    private Actor.ActorType type;
}
