import Skill from "../Skill";
import Ability from "../../Ability";

export default interface Archetype {
    name: string
    skills: Skill[]
    abilities: Ability[]
    experience: number
    brawn: number
    agility: number
    intellect: number
    cunning: number
    willpower: number
    presence: number
}