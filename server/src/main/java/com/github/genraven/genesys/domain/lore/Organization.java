package com.github.genraven.genesys.domain.lore;

import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "organizations")
public class Organization extends Lore {

    protected Organization() {}

    public Organization(final Lore lore) {
        this.setId(lore.getId());
        this.setName(lore.getName());
        this.setType(Type.ORGANIZATION);
    }

    private OrgType orgType;
    private int founded;
    private int disbanded;
    private String nickname;
    private String membersName;

    @Getter
    @AllArgsConstructor
    public enum OrgType {
        POLITICAL("Political"),
        SOCIAL("Social"),
        RELIGIOUS("Religious"),
        MILITARY("Military"),
        ACADEMIC("Academic");

        @JsonValue
        private final String label;
    }
}
