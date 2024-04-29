package com.github.genraven.gradlejavaserver.domain.campaign;

import com.github.genraven.gradlejavaserver.domain.Talent;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "campaigns")
public class Campaign {

    protected Campaign() {}
    public Campaign(final String name) {
        this.name = name;
    }

    @Id
    private String name;
    private Party party;
    private List<Session> sessions = new ArrayList<>();
    private List<Talent> talents = new ArrayList<>();
}
