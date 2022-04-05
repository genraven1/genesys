export enum CharacteristicType {
    Brawn = 'Brawn',
    Agility = 'Agility',
    Intellect = 'Intellect',
    Cunning = 'Cunning',
    Willpower = 'Willpower',
    Presence = 'Presence'
}

export interface Characteristic {
    type: CharacteristicType,
    currentValue: number,
    tempValue: number,
}

export class DefaultCharacteristic {
    static create(type: CharacteristicType): Characteristic {
        return {
            type: type,
            currentValue: 1,
            tempValue: 1,
        };
    }
}