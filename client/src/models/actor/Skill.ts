import {CharacteristicType} from '../character/Characteristic';

export default interface Skill {
    characteristic: CharacteristicType
    type: SkillType
    name: string
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}