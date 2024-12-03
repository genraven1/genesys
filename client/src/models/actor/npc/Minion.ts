import NonPlayerActor from "./NonPlayerActor";
import Skill from "../Skill";

export default interface Minion extends NonPlayerActor {
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group: boolean
}