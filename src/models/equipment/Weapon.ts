import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import Equipment, {ActorEquipment} from "./Equipment";

export interface Weapon extends Equipment {
    id: number
    damage: number
    skill: Skill
    critical: number
    range: RangeBand
    brawn: boolean
    settings: number[]
}

export interface ActorWeapon extends ActorEquipment, Weapon {

}