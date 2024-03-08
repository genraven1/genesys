import {EquipmentQuality} from "../Quality";
import Setting from "../Setting";

export default interface Equipment {
    name: string
    description: string
    price: number
    restricted: boolean
    encumbrance: number
    rarity: number
    qualities: EquipmentQuality[]
    settings: Setting[]
}

export interface ActorEquipment {
    equipped: boolean
    slot: EquipmentSlot
}

export enum EquipmentSlot {
    Main='Main Hand',
    Off='Off Hand',
    Both='Both Hands',
    Body='Body',
    None='None'
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