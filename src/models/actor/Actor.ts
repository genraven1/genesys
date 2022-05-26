import { Characteristic } from './Characteristics';
import { Defense } from './Defense';
import Talent from '../Talent';
import Stats from './Stats';
import Skill from "./Skill";

export default interface Actor {
    name: string,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    soak: number,
    melee: Defense,
    ranged: Defense,
    wounds: Stats,
    talents: ActorTalent[],
    skills: ActorSkill[]
}

export interface ActorTalent extends Talent {
    ranks: number
}

export interface ActorSkill extends Skill {
    ranks: number,
    career: boolean
}