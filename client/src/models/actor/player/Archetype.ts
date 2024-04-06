import Setting from "../../Setting";
import Skill from "../Skill";

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
    settings: Setting[]
}