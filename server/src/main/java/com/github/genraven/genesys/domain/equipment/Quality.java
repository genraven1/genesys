package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.modifier.Modifier;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "qualities")
public class Quality {

    public Quality(final String name) {
        this.name = name;
    }
    protected Quality() {}

    @Id
    private String id;
    private String name;
    private String description;
    private boolean passive = false;
    private int cost = 2;
    private boolean armor = false;
    private boolean weapon = false;
    private List<Modifier> modifiers = new ArrayList<>();
}
