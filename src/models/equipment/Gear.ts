import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import {ActorEquipment, ModifierType} from "./Equipment";

export interface Gear extends ActorEquipment {
    skill: Skill
    modifier: boolean
    type: ModifierType
    amount: number
    range: RangeBand
}