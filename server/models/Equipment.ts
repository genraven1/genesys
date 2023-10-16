import Setting from "./Setting.ts";
import {EquipmentQuality} from "./Quality.ts";

export default interface Equipment {
    id: number
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
    slot: string
}