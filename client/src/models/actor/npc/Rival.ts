import NonPlayerCharacter from "./NonPlayerCharacter";
import {ActorSkill} from "../Actor";

export default interface Rival extends NonPlayerCharacter {
    skills: ActorSkill[]
}