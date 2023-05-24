import Actor, {ActorSkill} from "../Actor";
import Ability from "../../Ability";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General'
}

export default interface NonPlayerCharacter extends Actor {
    combat: number,
    social: number,
    general: number,
    skills: ActorSkill[],
    abilities: Ability[]
}

export enum NonPlayerCharacterKey {
    Combat = 'combat',
    General = 'general',
    Social = 'social'
}