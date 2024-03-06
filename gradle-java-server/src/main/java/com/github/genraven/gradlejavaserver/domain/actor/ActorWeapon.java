package com.github.genraven.gradlejavaserver.domain.actor;

import com.github.genraven.gradlejavaserver.domain.equipment.EquipmentSlot;
import com.github.genraven.gradlejavaserver.domain.equipment.Weapon;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorWeapon extends Weapon {
    private boolean equipped;
    private EquipmentSlot slot;
}
