import NonPlayerActor from "./NonPlayerActor.ts";
import {ActorSkill} from "./Skill.ts";

export default interface Minion extends NonPlayerActor {
    skills: GroupSkill[]
}

export interface GroupSkill extends ActorSkill {
    group_skill: boolean
}