import Skill from "../actor/Skill";

export default interface Equipment {
    name: string
    description: string
    price: number
    restricted: boolean
    encumbrance: number
    slot: EquipmentSlot
    rarity: number
    equipped: boolean
}

export enum EquipmentSlot {
    Main='Main Hand',
    Off='Off Hand',
    Both='Both Hands',
    Body='Body'
}

export interface Encumbrance {
    value: number
    worn: boolean
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

export class DefaultArmor{
    static create():Armor {
        return {
            defense: 0,
            description: "",
            encumbrance: 0,
            name: "",
            price: 0,
            rarity: 0,
            slot: EquipmentSlot.Body,
            soak: 0,
            restricted: false,
            equipped: false
        }
    }
}