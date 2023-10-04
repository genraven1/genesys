import Actor, {ActorSkill} from "../Actor";
import Stats from "../Stats";

export default interface Player extends Actor {
    strain: Stats
    skills: PlayerSkill[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}