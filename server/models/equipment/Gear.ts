import Equipment, {ActorEquipment} from "./Equipment.ts";
import {Skill} from "../Skill.ts";

export interface Gear extends Equipment {
    skill: Skill
    modifier: boolean
    type: string
    amount: number
    range: string
}

export interface ActorGear extends ActorEquipment, Gear {}