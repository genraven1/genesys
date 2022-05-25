export enum CharacteristicType {
    Brawn = 'Brawn',
    Agility = 'Agility',
    Intellect = 'Intellect',
    Cunning = 'Cunning',
    Willpower = 'Willpower',
    Presence = 'Presence'
}

export interface Characteristic {
    current: number,
    temp: number,
}

export class DefaultCharacteristic {
    static create(): Characteristic {
        return {
            current: 1,
            temp: 1,
        };
    }
}