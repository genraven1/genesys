package com.github.genraven.genesys.domain.skill;

import com.github.genraven.genesys.domain.actor.Characteristic;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "skills")
public class Skill {

    public Skill(final String name) {
        this.name = name;
    }

    protected Skill() {
    }

    @Id
    private String id;
    private String name;
    private Characteristic.Type characteristic = Characteristic.Type.BRAWN;
    private SkillType type = SkillType.GENERAL;
    private boolean initiative = false;
}
