import NonPlayerActor from "./NonPlayerActor";
import Skill from "../Skill";
import Talent from "../../Talent";

export default interface Minion extends NonPlayerActor {
    talents: GroupTalent[]
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group: boolean
}

export interface GroupTalent extends Talent {
    group: boolean
}