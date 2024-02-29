import {CharacteristicType} from './Characteristics';
import Setting from "../Setting";

export default interface Skill {
    characteristic: CharacteristicType
    type: SkillType
    name: string
    settings: Setting[]
}

export enum SkillType {
    General = 'General',
    Magic = 'Magic',
    Social = 'Social',
    Combat = 'Combat',
    Knowledge = 'Knowledge'
}