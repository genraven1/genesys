package com.github.genraven.gradlejavaserver.domain;

import com.github.genraven.gradlejavaserver.domain.modifier.Modifier;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "injuries")
public class CriticalInjury {

    protected CriticalInjury() {
    }

    public CriticalInjury(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private String description;
    private Difficulty severity;
    private int min;
    private int max;
    private List<Modifier> modifiers = new ArrayList<>();
}
