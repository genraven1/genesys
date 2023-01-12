import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import Equipment from "./Equipment";

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
    range: RangeBand
    brawn: boolean
}