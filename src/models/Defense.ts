export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    type: DefenseType,
    currentValue: number,
    tempValue: number,
}

const defaultMeleeDefense = { type: DefenseType.Melee, currentValue: 0, tempValue: 0 };
const defaultRangedDefense = { type: DefenseType.Ranged, currentValue: 0, tempValue: 0 };

export const defaultDefense = [defaultMeleeDefense, defaultRangedDefense];