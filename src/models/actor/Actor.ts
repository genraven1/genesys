import {Characteristic} from './Characteristics';
import { Defense } from './Defense';
import Talent from '../Talent';
import Stats from './Stats';
import Skill from "./Skill";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";

export default interface Actor {
    name: string,
    type: ActorType,
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
    weapons: ActorWeapon[],
    armor: ActorArmor[],
    gear: ActorGear[],
    settings: string[]
}

export interface ActorTalent extends Talent {
    ranks: number
}

export interface ActorSkill extends Skill {
    ranks: number
}

export enum ActorType {
    Minion = 'Minion',
    Rival = 'Rival',
    Nemesis = 'Nemesis',
    Player = 'Player'
}

export enum ActorKey {
    Agility = 'agility',
    Brawn = 'brawn',
    Cunning = 'cunning',
    Intellect = 'intellect',
    Melee = 'melee',
    Name = 'name',
    Presence = 'presence',
    Ranged = 'ranged',
    Soak = 'soak',
    Talents = 'talents',
    Willpower = 'willpower',
    Wounds = 'wounds',
    Strain = 'strain',
    Skills = 'skills'
}