import Ability from "../../Ability";
import {PlayerSkill} from "./Player";

export default interface Archetype {
    name: string
    brawn: number
    agility: number
    intellect: number
    cunning: number
    willpower: number
    presence: number
    wounds: number
    strain: number
    experience: number
    skills: PlayerSkill[]
    abilities: Ability[]
    settings: string[]
}