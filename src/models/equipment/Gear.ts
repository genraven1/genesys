import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import Equipment, {ActorEquipment, ModifierType} from "./Equipment";

export interface Gear extends Equipment {
    skill: Skill
    modifier: boolean
    type: ModifierType
    amount: number
    range: RangeBand
}

export interface ActorGear extends ActorEquipment, Gear {}