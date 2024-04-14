package com.github.genraven.gradlejavaserver.domain.equipment;

import com.github.genraven.gradlejavaserver.domain.RangeBand;
import com.github.genraven.gradlejavaserver.domain.skill.Skill;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "weapons")
public class Weapon extends Equipment {

    protected Weapon() {}

    public Weapon(final Equipment equipment) {
        this.setName(equipment.getName());
        this.setDescription(equipment.getDescription());
        this.setPrice(equipment.getPrice());
        this.setRestricted(equipment.isRestricted());
        this.setEncumbrance(equipment.getEncumbrance());
        this.setRarity(equipment.getRarity());
        this.setModifiers(equipment.getModifiers());
        this.setQualities(equipment.getQualities());
        this.setSettings(equipment.getSettings());
    }

    private int damage = 0;
    private Skill skill;
    private int critical = 3;
    private RangeBand range = RangeBand.ENGAGED;
    private boolean brawn = false;
    private int hands = 1;
}
