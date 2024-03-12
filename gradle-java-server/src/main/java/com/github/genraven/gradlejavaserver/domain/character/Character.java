package com.github.genraven.gradlejavaserver.domain.character;

import com.github.genraven.gradlejavaserver.domain.actor.Actor;
import lombok.Data;

@Data
public class Character {

    protected Character() {}

    public Character(final Actor actor) {

    }

    private StatusEffect disoriented = new StatusEffect(StatusEffect.Type.DISORIENTED);
    private StatusEffect immobilized = new StatusEffect(StatusEffect.Type.IMMOBILIZED);
    private StatusEffect staggered = new StatusEffect(StatusEffect.Type.STAGGERED);
}
