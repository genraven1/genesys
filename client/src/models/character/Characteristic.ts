import {Option} from "../../components/common/InputSelectField";

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
    type: CharacteristicType
}

export const getCharacteristicTypes = (): Option[] => {
    return Object.values(CharacteristicType).map((value) => ({value}))
}