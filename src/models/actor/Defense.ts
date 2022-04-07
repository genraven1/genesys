export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    type: DefenseType,
    currentValue: number,
    tempValue: number,
}

export class DefaultDefense {
    static create(type: DefenseType): Defense {
        return {
            type: type,
            currentValue: 0,
            tempValue: 0
        }
    }
}