import {CharacteristicType} from '../character/Characteristic';
import {Option} from "../../components/common/InputSelectField";

export default interface Skill {
    id: string
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

export const getSkillTypes = (): Option[] => {
    return Object.values(SkillType).map((value) => ({value}))
}