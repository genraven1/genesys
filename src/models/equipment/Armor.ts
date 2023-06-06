import Equipment, {ActorEquipment} from "./Equipment";
import {EquipmentQuality} from "../Quality";

export interface Armor extends Equipment {
    soak: number
    defense: number
    qualities: EquipmentQuality[]
}

export interface ActorArmor extends ActorEquipment, Armor {}