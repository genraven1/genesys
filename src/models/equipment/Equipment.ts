import Skill from "../actor/Skill";

export default interface Equipment {
    name: string
    description: string
    price: string
    encumbrance: number
    rarity: number
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