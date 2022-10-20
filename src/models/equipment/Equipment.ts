import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";

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
    range: RangeBand
    brawn: boolean
}

export interface Gear extends Equipment {
    skill: Skill
    modifier: boolean
    type: ModifierType
    amount: number
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