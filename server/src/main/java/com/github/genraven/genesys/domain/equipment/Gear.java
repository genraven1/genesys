package com.github.genraven.genesys.domain.equipment;

import com.github.genraven.genesys.domain.RangeBand;
import com.github.genraven.genesys.domain.skill.Skill;
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
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setModifiers(equipment.getModifiers());
        this.setQualities(equipment.getQualities());
    }

    private Skill skill;
    private int amount;
    private RangeBand range = RangeBand.ENGAGED;
}
