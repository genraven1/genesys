import Setting from "../../Setting";
import Skill from "../Skill";
import Ability from "../../Ability";

export default interface Archetype {
    name: string
    description: string
    brawn: number
    agility: number
    intellect: number
    cunning: number
    willpower: number
    presence: number
    wounds: number
    strain: number
    skill: Skill
    abilities: Ability[]
    settings: Setting[]
}