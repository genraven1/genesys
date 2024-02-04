package com.github.genraven.gradlejavaserver.domain;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "talents")
public class Talent {

    public Talent(final String name) {
        this.name = name;
    }
    private Talent() {}

    @Id
    private String name;
    private Activation activation;
    private Tier tier;
    private boolean ranked;
    private String summary;
    private String description;
    private List<Setting> settings;

    @AllArgsConstructor
    @Getter
    public enum Tier {
        FIRST("First"),
        SECOND("Second"),
        THIRD("Third"),
        FOURTH("Fourth"),
        FIFTH("Fifth");

        @JsonValue
        private final String label;
    }
}
