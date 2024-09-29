import Modifier from "./common/Modifier";

export default interface Quality {
    id: string
    name: string
    description: string
    passive: boolean
    cost: number
    armor: boolean
    weapon: boolean
    modifiers: Modifier[]
}

export interface EquipmentQuality extends Quality {
    ranks: number
}