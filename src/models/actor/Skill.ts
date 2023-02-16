import {CharacteristicType} from './Characteristics';

export default interface Skill {
    characteristic: CharacteristicType
    active: boolean
    type: SkillType
    name: string
    id: number
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}

export enum SkillKey {
    Characteristic ='characteristic',
    Active = 'active',
    Type = 'type',
    Name = 'name'
}