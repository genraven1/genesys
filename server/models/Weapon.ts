
import Equipment, {ActorEquipment} from "./Equipment";
import {Skill} from "./Skill.ts";

export interface Weapon extends Equipment {
    damage: number
    skill: Skill
    critical: number
    range: string
    brawn: boolean
}

export interface ActorWeapon extends ActorEquipment, Weapon {}