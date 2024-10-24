import {Difficulty} from "../common/Difficulty";
import Skill from "../actor/Skill";

export default interface Spell {
    id: string
    name: string
    concentration: boolean
    difficulty: Difficulty
    description: string
    skills: Skill[]
    effects: Effect[]
}

export interface Effect {
    name: string
    description: string
    increase: number
}