import Skill from "../actor/Skill";

export default interface Equipment {
    name: string
    description: string
    price: Price
    encumbrance: Encumbrance
    rarity: Rarity
}

export interface Price {
    value: number
    restricted: boolean
}

export interface Encumbrance {
    value: number
    worn: boolean
}

export interface Rarity {
    value: number
    modifier: number
}

export interface Armor extends Equipment {
    soak: number
    defense: number
}

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
}

export enum EquipmentType {
    Armor='Armor',
    Weapon='Weapon',
    Gear='Gear'
}