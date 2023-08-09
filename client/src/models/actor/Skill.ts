import {CharacteristicType} from './Characteristics';

export default interface Skill {
    id: number
    characteristic: CharacteristicType
    type: SkillType
    name: string
    settings: string[]
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}