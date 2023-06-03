import Equipment, {ActorEquipment} from "./Equipment";
import Quality from "../Quality";

export interface Armor extends Equipment {
    soak: number
    defense: number
    qualities: Quality[]
}

export interface ActorArmor extends ActorEquipment, Armor {}