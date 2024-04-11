import {Option} from '../../components/common/InputSelectField';

export default interface Modifier {
    type: Type
    ranks: number
}

export enum Type {
    IncreaseEncumbranceCapacity = 'Increase Encumbrance Capacity',
    IncreaseBaseEncumbranceCapacity = 'Increase Base Encumbrance Capacity',
    MoveStoryPoint = 'Move Story Point',
    IncreaseSoak = 'Increase Soak',
    IncreaseWoundThreshold = 'Increase Wound Threshold',
    SufferWounds = 'Suffer Wounds',
    SufferWoundsByTalent = 'Suffer Wounds By Talent',
    SufferStrain = 'Suffer Strain',
    IncreaseCriticalInjury = 'Increase Critical Injury',
    DecreaseCriticalInjury = 'Decrease Critical Injury',
    ResetCriticalInjury = 'Reset Critical Injury',
    AddSetbackOnTargetedSocial = 'Add Setback on Targeted Social'
}

export const getModifierOptions = (): Option[] => {
    return Object.values(Type).map((value) => ({value}))
}