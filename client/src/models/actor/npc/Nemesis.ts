import NonPlayerCharacter from "./NonPlayerCharacter";
import {ActorSkill} from "../Actor";

export default interface Nemesis extends NonPlayerCharacter {
    skills: ActorSkill[],
    strain: number
}