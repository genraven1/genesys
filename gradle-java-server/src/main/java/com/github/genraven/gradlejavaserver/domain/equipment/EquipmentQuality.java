package com.github.genraven.gradlejavaserver.domain.equipment;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EquipmentQuality extends Quality {

    public EquipmentQuality(final Quality quality) {
        this.setName(quality.getName());
        this.setDescription(quality.getDescription());
        this.setPassive(quality.isPassive());
        this.setCost(quality.getCost());
        this.setArmor(quality.isArmor());
        this.setWeapon(quality.isWeapon());
    }
    private int ranks = 0;
}
