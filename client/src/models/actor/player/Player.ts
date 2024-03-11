import { ActorTalent } from "../../Talent";
import Actor, {ActorSkill} from "../Actor";
import Injury from "../../Injury";

export default interface Player extends Actor {
    strain: number
    talents: ActorTalent[]
    skills: PlayerSkill[]
    injuries: Injury[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}