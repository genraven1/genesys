package com.github.genraven.genesys.domain.actor.player;

import com.github.genraven.genesys.domain.Ability;
import com.github.genraven.genesys.domain.skill.Skill;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "archetypes")
public class Archetype {

    protected Archetype() {
    }

    public Archetype(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private String description;
    private int brawn = 1;
    private int agility = 1;
    private int intellect = 1;
    private int cunning = 1;
    private int willpower = 1;
    private int presence = 1;
    private int wounds = 1;
    private int strain = 1;
    private int experience = 0;
    private Skill skill;
    private List<Ability> abilities = new ArrayList<>();
}
