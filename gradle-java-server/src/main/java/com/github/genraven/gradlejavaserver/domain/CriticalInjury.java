package com.github.genraven.gradlejavaserver.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
}
