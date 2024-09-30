package com.github.genraven.genesys.domain.equipment;

import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "armors")
public class Armor extends Equipment {

    protected Armor() {}

    public Armor(final Equipment equipment) {
        this.setId(equipment.getId());
        this.setName(equipment.getName());
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setModifiers(equipment.getModifiers());
        this.setQualities(equipment.getQualities());
    }

    private int soak = 0;
    private int defense = 0;
}
