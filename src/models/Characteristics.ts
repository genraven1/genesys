export enum CharacteristicType {
    Brawn = 'Brawn',
    Agility = 'Agility',
    Intellect = 'Intellect',
    Cunning = 'Cunning',
    Willpower = 'Willpower',
    Presence = 'Presence'
}

export interface Characteristic {
    label: CharacteristicType,
    currentValue: number,
    tempValue: number,
}

const brawn = { label: CharacteristicType.Brawn, currentValue: 1, tempValue: 1 }
const agility = { label: CharacteristicType.Agility, currentValue: 1, tempValue: 1 }
const intellect = { label: CharacteristicType.Intellect, currentValue: 1, tempValue: 1 }
const cunning = { label: CharacteristicType.Cunning, currentValue: 1, tempValue: 1 }
const willpower = { label: CharacteristicType.Willpower, currentValue: 1, tempValue: 1 }
const presence = { label: CharacteristicType.Presence, currentValue: 1, tempValue: 1 }

export const defaultCharacteristics = [brawn, agility, intellect, cunning, willpower, presence];

export class DefaultCharacteristic {
    static create(type: CharacteristicType): Characteristic {
        return {
            label: type,
            currentValue: 1,
            tempValue: 1,
        };
    }
}