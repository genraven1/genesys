import { ActorTalent } from "./Talent";

export default interface Actor {
    name: string,
    id: string,
    characteristics: Characteristics[],
    soak: number,
    defense: Defense[],
    wounds: Wounds,
    talents: ActorTalent[],
}

export enum Characteristic {
    Brawn = 'Brawn',
    Agility = 'Agility',
    Intellect = 'Intellect',
    Cunning = 'Cunning',
    Willpower = 'Willpower',
    Presence = 'Presence'
}

export interface Characteristics {
    label: Characteristic,
    currentValue: number,
    tempValue: number,
    minValue: number,
    maxValue: number,
}

const brawn = { label: Characteristic.Brawn, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}
const agility = { label: Characteristic.Agility, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}
const intellect = { label: Characteristic.Intellect, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}
const cunning = { label: Characteristic.Cunning, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}
const willpower = { label: Characteristic.Willpower, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}
const presence = { label: Characteristic.Presence, currentValue: 1, tempValue: 1, minValue: 1, maxValue: 1}

export const defaultCharacteristics = [brawn, agility, intellect, cunning, willpower, presence];

export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    type: DefenseType,
    currentValue: number,
    tempValue: number,
}

const defaultMeleeDefense = { type: DefenseType.Melee, currentValue: 0, tempValue: 0 };
const defaultRangedDefense = { type: DefenseType.Ranged, currentValue: 0, tempValue: 0 };
export const defaultDefense = [defaultMeleeDefense, defaultRangedDefense];

export interface Wounds {
    currentValue: number,
    maxValue: number,
}

export const defaultWounds = { currentValue: 0, maxValue: 1}