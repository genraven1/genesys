import Actor, {ActorSkill} from "../Actor";

export default interface Player extends Actor {
    strain: number
    skills: PlayerSkill[]
}

export interface PlayerSkill extends ActorSkill {
    career: boolean
}