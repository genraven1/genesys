package com.github.genraven.gradlejavaserver.domain.equipment;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "qualities")
public class Quality {

    public Quality(final String name) {
        this.name = name;
    }
    protected Quality() {}

    @Id
    private String name;
    private String description;
    private boolean passive = false;
    private int cost = 2;
    private boolean armor = false;
    protected boolean weapon = false;
}
