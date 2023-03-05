export default interface Equipment {
    name: string
    description: string
    price: number
    restricted: boolean
    encumbrance: number
    rarity: number
    id: number
    settings: number[]
}

export interface ActorEquipment {
    equipped: boolean
    slot: EquipmentSlot
}

export enum EquipmentSlot {
    Main='Main Hand',
    Off='Off Hand',
    Both='Both Hands',
    Body='Body'
}

export enum EquipmentType {
    Armor='Armor',
    Weapon='Weapon',
    Gear='Gear'
}

export enum ModifierType {
    Success = 'Success',
    Advantage = 'Advantage',
    Triumph = 'Triumph',
    Failure = 'Failure',
    Threat = 'Threat',
    Despair = 'Despair',
    Boost = 'Boost',
    Setback = 'Setback'
}