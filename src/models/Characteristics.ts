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
}

const brawn = { label: Characteristic.Brawn, currentValue: 1, tempValue: 1 }
const agility = { label: Characteristic.Agility, currentValue: 1, tempValue: 1 }
const intellect = { label: Characteristic.Intellect, currentValue: 1, tempValue: 1 }
const cunning = { label: Characteristic.Cunning, currentValue: 1, tempValue: 1 }
const willpower = { label: Characteristic.Willpower, currentValue: 1, tempValue: 1 }
const presence = { label: Characteristic.Presence, currentValue: 1, tempValue: 1 }

export const defaultCharacteristics = [brawn, agility, intellect, cunning, willpower, presence];

export class Characteristics {
    static create(): Characteristics {
        return {
            label: Characteristic.Brawn,
            currentValue: 1,
            tempValue: 1,
        };
    }
}