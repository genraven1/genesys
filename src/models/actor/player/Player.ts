import Actor from "../Actor";
import Skill from "../Skill";
import Stats from "../Stats";

export default interface Player extends Actor {
    strain: Stats
    skills: PlayerSkill[]
}

export interface PlayerSkill extends Skill {
    career: boolean
    ranks: number
}