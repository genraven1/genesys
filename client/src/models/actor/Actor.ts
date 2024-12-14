import {Characteristic, CharacteristicType} from './Characteristic';
import Skill from "./Skill";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";
import {Option} from "../../components/common/InputSelectField";
import {SingleNonPlayerCharacter} from "./npc/NonPlayerActor";

export default interface Actor {
    id: string
    name: string,
    type: ActorType,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
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

export const getActorCharacteristicRanks = (actor: Actor, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility.current;
        case CharacteristicType.Brawn:
            return actor.brawn.current;
        case CharacteristicType.Cunning:
            return actor.cunning.current;
        case CharacteristicType.Intellect:
            return actor.intellect.current;
        case CharacteristicType.Presence:
            return actor.presence.current;
        case CharacteristicType.Willpower:
            return actor.willpower.current;
    }
};

export const getCharacteristicRanks = (actor: SingleNonPlayerCharacter, skill: ActorSkill): number => {
    switch (skill.characteristic) {
        case CharacteristicType.Agility:
            return actor.agility.current;
        case CharacteristicType.Brawn:
            return actor.brawn.current;
        case CharacteristicType.Cunning:
            return actor.cunning.current;
        case CharacteristicType.Intellect:
            return actor.intellect.current;
        case CharacteristicType.Presence:
            return actor.presence.current;
        case CharacteristicType.Willpower:
            return actor.willpower.current;
    }
};

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