export default interface Quality {
    name: string
    description: string
    passive: boolean
    cost: number
    armor: boolean
    weapon: boolean
}

export interface EquipmentQuality extends Quality {
    ranks: number
}