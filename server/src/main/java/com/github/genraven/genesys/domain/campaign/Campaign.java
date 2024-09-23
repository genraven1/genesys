package com.github.genraven.genesys.domain.campaign;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "campaigns")
public class Campaign {

    protected Campaign() {
    }

    public Campaign(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private Party party = new Party();
    private List<Session> sessions = new ArrayList<>();
    private boolean current = false;
    private List<String> talentIds = new ArrayList<>();
}
