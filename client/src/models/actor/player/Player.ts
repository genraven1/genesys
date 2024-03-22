import { ActorTalent } from "../../Talent";
import Actor, {ActorSkill} from "../Actor";
import Injury from "../../Injury";
import Career from "./Career";

export default interface Player extends Actor {
    strain: number
    career: Career
    talents: ActorTalent[]
    skills: PlayerSkill[]
    injuries: Injury[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}