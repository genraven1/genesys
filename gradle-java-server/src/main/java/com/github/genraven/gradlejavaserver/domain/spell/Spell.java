package com.github.genraven.gradlejavaserver.domain.spell;

import com.github.genraven.gradlejavaserver.domain.Difficulty;
import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "spells")
public class Spell {

    protected Spell() {}

    public Spell(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private boolean concentration;
    private Difficulty difficulty;
    private String description;
    private List<Skill> skills;
    private List<Effect> effects;
}
