import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import Equipment, {ActorEquipment} from "./Equipment";

export interface Gear extends Equipment {
    skill: Skill
    amount: number
    range: RangeBand
}

export interface ActorGear extends ActorEquipment, Gear {}