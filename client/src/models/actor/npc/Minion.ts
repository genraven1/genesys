import NonPlayerCharacter from "./NonPlayerCharacter";
import Skill from "../Skill";

export default interface Minion extends NonPlayerCharacter {
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group_skill: boolean
}