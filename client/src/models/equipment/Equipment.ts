import {EquipmentQuality} from "../Quality";
import Setting from "../Setting";
import Modifier from "../Modifier";

export default interface Equipment {
    name: string
    description: string
    price: number
    restricted: boolean
    encumbrance: number
    rarity: number
    modifiers: Modifier[]
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