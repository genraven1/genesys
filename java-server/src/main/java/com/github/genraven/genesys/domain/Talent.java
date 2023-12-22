package com.github.genraven.genesys.domain;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document
public class Talent {

    public Talent(final String name) {
        this.name = name;
    }

    @Id
    private Long id;
    private String name;
    private boolean ranked;
    private String summary;
    private String description;
}
