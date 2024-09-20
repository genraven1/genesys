package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import com.github.genraven.genesys.domain.equipment.Weapon;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorWeapon extends Weapon {
    private EquipmentSlot slot = EquipmentSlot.NONE;
}
