import Actor, {ActorSkill} from "../Actor";
import {ActorTalent} from "../../Talent";

export default interface Player extends Actor {
    strain: number
    talents: ActorTalent[],
    skills: PlayerSkill[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}