import BaseEquipmentStats, { DefaultEquipment } from "./Equipment"

export default interface Armor {
    armorStats: ArmorStats,
    equipment: BaseEquipmentStats
}

export interface ArmorStats {
    soak: number,
    defense: number,
}

export class DefaultArmorStats {
    static create(): ArmorStats {
        return {
            soak: 0,
            defense: 0,
        }
    }
}

export class DefaultArmor {
    static create(): Armor {
        return {
            equipment: DefaultEquipment.create(),
            armorStats: { soak: 0, defense: 0 },
        }
    }
}