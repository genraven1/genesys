package com.github.genraven.gradlejavaserver.domain.equipment;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "gears")
public class Gear extends Equipment {

    protected Gear() {}

    public Gear(final Equipment equipment) {
        this.setName(equipment.getName());
        this.setSettings(equipment.getSettings());
    }
}
