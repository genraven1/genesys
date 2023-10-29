import NonPlayerCharacter from "./NonPlayerCharacter";
import Skill from "../Skill";
import Talent from "../../Talent";

export default interface Minion extends NonPlayerCharacter {
    talents: Talent[]
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group_skill: boolean
}