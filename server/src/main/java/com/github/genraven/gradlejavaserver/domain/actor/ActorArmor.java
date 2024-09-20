package com.github.genraven.gradlejavaserver.domain.actor;

import com.github.genraven.gradlejavaserver.domain.equipment.Armor;
import com.github.genraven.gradlejavaserver.domain.equipment.EquipmentSlot;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorArmor extends Armor {
    private EquipmentSlot slot = EquipmentSlot.NONE;
}
