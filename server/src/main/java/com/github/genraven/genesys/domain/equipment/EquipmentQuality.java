package com.github.genraven.genesys.domain.equipment;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EquipmentQuality extends Quality {

    protected EquipmentQuality() {}

    public EquipmentQuality(final Quality quality) {
        this.setName(quality.getName());
        this.setDescription(quality.getDescription());
        this.setCost(quality.getCost());
        this.setArmor(quality.isArmor());
        this.setWeapon(quality.isWeapon());
        this.setModifiers(quality.getModifiers());
    }
    private int ranks = 0;
}
