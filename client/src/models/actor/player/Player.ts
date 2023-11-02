import { ActorTalent } from "../../Talent";
import Actor, {ActorSkill} from "../Actor";

export default interface Player extends Actor {
    strain: number
    talents: ActorTalent[]
    skills: PlayerSkill[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}