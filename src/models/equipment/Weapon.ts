import Skill from "../actor/Skill";
import {RangeBand} from "../common/RangeBand";
import Equipment, {ActorEquipment} from "./Equipment";
import {EquipmentQuality} from "../Quality";

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
    range: RangeBand
    brawn: boolean
    qualities: EquipmentQuality[]
}

export interface ActorWeapon extends ActorEquipment, Weapon {}