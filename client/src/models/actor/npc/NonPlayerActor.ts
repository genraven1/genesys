import Actor, {ActorSkill} from "../Actor";
import Ability from "../../Ability";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General'
}

export default interface NonPlayerActor extends Actor {
    combat: number,
    social: number,
    general: number,
    abilities: Ability[]
}

export interface SingleNonPlayerCharacter extends NonPlayerActor {
    skills: ActorSkill[]
}

export enum NonPlayerCharacterKey {
    Combat = 'combat',
    General = 'general',
    Social = 'social'
}

export const getRatings = (npc: NonPlayerActor): string => {
    return '[combat] ' + String(npc?.combat!!) + ' [social] ' + String(npc?.social!!) + ' [general] ' + String(npc?.general!!)
}

export const combat = '[combat]'
export const social = '[social]'
export const general = '[general]'