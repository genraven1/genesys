import {CharacteristicType} from '../character/Characteristic';
import Skill from "./Skill";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";
import {Option} from "../../components/common/InputSelectField";

export default interface Actor {
    id: string
    name: string,
    type: ActorType,
    brawn: number,
    agility: number,
    intellect: number,
    cunning: number,
    willpower: number,
    presence: number,
    wounds: number,
    soak: number,
    melee: number,
    ranged: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    gear: ActorGear[],
}

export interface ActorSkill extends Skill {
    ranks: number
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

export const getActorTypes = (): Option[] => {
    return Object.values(ActorType).map((value) => ({value}))
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