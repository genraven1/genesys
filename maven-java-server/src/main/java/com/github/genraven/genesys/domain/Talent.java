package com.github.genraven.genesys.domain;

import lombok.Data;
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
    private Long id;
    private String name;
    private Activation activation;
    private boolean ranked;
    private String summary;
    private String description;
    private List<Setting> settings;
}
