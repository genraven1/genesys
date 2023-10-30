import NonPlayerActor from "./NonPlayerActor";
import Skill from "../Skill";
import Talent from "../../Talent";

export default interface Minion extends NonPlayerActor {
    talents: Talent[]
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group_skill: boolean
}