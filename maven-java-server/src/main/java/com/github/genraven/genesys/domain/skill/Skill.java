package com.github.genraven.genesys.domain.skill;

import com.github.genraven.genesys.domain.Setting;
import com.github.genraven.genesys.domain.actor.CharacteristicType;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "skills")
@NoArgsConstructor
public class Skill {

    public Skill(final String name) {
        this.name = name;
    }

    @Id
    private Long id;
    private String name;
    private CharacteristicType characteristic;
    private SkillType type;
    private List<Setting> settings;
}
