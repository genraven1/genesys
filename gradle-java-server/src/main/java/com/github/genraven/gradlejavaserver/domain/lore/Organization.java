package com.github.genraven.gradlejavaserver.domain.lore;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "organizations")
public class Organization extends Lore {

    protected Organization() {}

    public Organization(final Lore lore) {
        this.setName(lore.getName());
        this.setType(Type.ORGANIZATION);
        this.setSettings(lore.getSettings());
    }

    private int founded;
    private int disbanded;
    private String nickname;
    private String membersName;
}
