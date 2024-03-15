import {Option} from '../components/common/InputSelectField';

export default interface Modifier {
    modifier: Type
    ranks: number
}

export enum Type {
    IncreaseWoundThreshold = 'Increase Wound Threshold',
    SufferWounds = 'Suffer Wounds',
    SufferWoundsByTalent = 'Suffer Wounds By Talent',
    IncreaseCriticalInjury = 'Increase Critical Injury',
    DecreaseCriticalInjury = 'Decrease Critical Injury',
    ResetCriticalInjury = 'Reset Critical Injury',
}

export const getModifierOptions = (): Option[] => {
    return Object.values(Type).map((value) => ({value}))
}