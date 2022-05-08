import Equipment from "./Equipment"
import EquipmentStats, { DefaultEquipment } from "./EquipmentStats"

export default interface Armor extends Equipment {
    armorStats: ArmorStats,
    equipment: EquipmentStats
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
            id: '',
            name: '',
            description: '',
            price: ''
        }
    }
}