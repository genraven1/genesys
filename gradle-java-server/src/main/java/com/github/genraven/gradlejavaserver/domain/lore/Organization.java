package com.github.genraven.gradlejavaserver.domain.lore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class Organization extends Lore {

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
