import NonPlayerCharacter from "./NonPlayerCharacter";
import {ActorSkill} from "../Actor";

export default interface Minion extends NonPlayerCharacter {
    skills: GroupSkill[]
}

export interface GroupSkill extends ActorSkill {
    group: boolean
}