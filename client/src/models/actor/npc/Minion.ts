import NonPlayerActor, {SingleNonPlayerCharacter} from "./NonPlayerActor";
import Skill from "../Skill";

export default interface Minion extends NonPlayerActor {
    skills: GroupSkill[]
}

export interface GroupSkill extends Skill {
    group: boolean
}

export interface MinionGroup extends SingleNonPlayerCharacter {
    size: number
}