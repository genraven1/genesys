import Equipment, {ActorEquipment} from "./Equipment.ts";

export interface Armor extends Equipment {
    soak: number
    defense: number
}

export interface ActorArmor extends ActorEquipment, Armor {}