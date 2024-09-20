package com.github.genraven.genesys.domain.actor;

import com.github.genraven.genesys.domain.equipment.Armor;
import com.github.genraven.genesys.domain.equipment.EquipmentSlot;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class ActorArmor extends Armor {
    private EquipmentSlot slot = EquipmentSlot.NONE;
}
