import {EquipmentQuality} from "../Quality";
import Setting from "../Setting";
import Modifier from "../common/Modifier";

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

export enum EquipmentType {
    Armor = 'Armor',
    Weapon = 'Weapon',
    Gear = 'Gear'
}