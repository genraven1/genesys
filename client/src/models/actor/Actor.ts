import {CharacteristicType} from './Characteristics';
import { Defense } from './Defense';
import Talent from '../Talent';
import Stats from './Stats';
import Skill from "./Skill";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";
import Setting from "../Setting";

export default interface Actor {
    id: number
    name: string,
    type: ActorType,
    brawn: number,
    agility: number,
    intellect: number,
    cunning: number,
    willpower: number,
    presence: number,
    soak: number,
    melee: Defense,
    ranged: Defense,
    wounds: Stats,
    talents: ActorTalent[],
    weapons: ActorWeapon[],
    armor: ActorArmor[],
    gear: ActorGear[],
    settings: Setting[]
}

export interface ActorTalent extends Talent {
    ranks: number
}

export interface ActorSkill extends Skill {
    ranks: number
}

export const setSkillName = (skill: ActorSkill): string => {
    return skill.name + '(' + skill.characteristic + ')'
}

export const getCharacteristicRanks = (actor: Actor, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility
        case CharacteristicType.Brawn:
            return actor.brawn
        case CharacteristicType.Cunning:
            return actor.cunning
        case CharacteristicType.Intellect:
            return actor.intellect
        case CharacteristicType.Presence:
            return actor.presence
        case CharacteristicType.Willpower:
            return actor.willpower
    }
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