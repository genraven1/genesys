import {ActorEquipment} from "./Equipment";

export interface Armor extends ActorEquipment {
    soak: number
    defense: number
}