import Skill from "../actor/Skill";
import {Range} from "../common/Range";

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
    range: Range
    brawn: boolean
}

export enum EquipmentType {
    Armor='Armor',
    Weapon='Weapon',
    Gear='Gear'
}