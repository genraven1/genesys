import {SingleNonPlayerCharacter} from "./NonPlayerCharacter";
import {ActorSkill} from "../Actor";

export default interface Nemesis extends SingleNonPlayerCharacter {
    skills: ActorSkill[],
    strain: number
}