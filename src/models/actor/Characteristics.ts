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
    current: number,
    temp: number,
}

export class DefaultCharacteristic {
    static create(type: CharacteristicType): Characteristic {
        return {
            type: type,
            current: 1,
            temp: 1,
        };
    }
}