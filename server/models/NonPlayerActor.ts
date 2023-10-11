import Actor from "./Actor.ts";
import {ActorSkill} from "./Skill.ts";
import Ability from "./Ability.ts";

export default interface NonPlayerActor extends Actor {
    combat: number,
    social: number,
    general: number,
    skills: ActorSkill[],
    abilities: Ability[]
}