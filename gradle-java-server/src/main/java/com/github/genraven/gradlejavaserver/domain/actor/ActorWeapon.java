package com.github.genraven.gradlejavaserver.domain.actor;

import com.github.genraven.gradlejavaserver.domain.equipment.EquipmentSlot;
import com.github.genraven.gradlejavaserver.domain.equipment.Weapon;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorWeapon extends Weapon {

    protected ActorWeapon() {}

    public ActorWeapon(final Weapon weapon) {
        this.setName(weapon.getName());
        this.setDescription(weapon.getDescription());
        this.setQualities(weapon.getQualities());
        this.setEncumbrance(weapon.getEncumbrance());
        this.setRarity(weapon.getRarity());
        this.setPrice(weapon.getPrice());
        this.setRestricted(weapon.isRestricted());
        this.setDescription(weapon.getDescription());
        this.setDamage(weapon.getDamage());
        this.setCritical(weapon.getCritical());
        this.setSkill(weapon.getSkill());
        this.setRange(weapon.getRange());
        this.setBrawn(weapon.isBrawn());
        this.setSettings(weapon.getSettings());
    }

    private boolean equipped;
    private EquipmentSlot slot;
}
