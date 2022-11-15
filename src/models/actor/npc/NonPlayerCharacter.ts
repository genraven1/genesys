import Actor from "../Actor";
import Skill from "../Skill";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General',
}

export default interface NonPlayerCharacter extends Actor {
    combat: number,
    social: number,
    general: number,
    skills: NonPlayerCharacterSkill[]
}

export interface NonPlayerCharacterSkill extends Skill {
    ranks: number
}

export enum NonPlayerCharacterKey {
    Combat = 'combat',
    General = 'general',
    Social = 'social'
}