package com.github.genraven.gradlejavaserver.domain.actor.player;

import com.github.genraven.gradlejavaserver.domain.Setting;
import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "careers")
public class Career {

    protected Career() {}

    public Career(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private List<Skill> skills = new ArrayList<>();
    private List<Setting> settings = new ArrayList<>();
}
