export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    type: DefenseType,
    current: number,
    temp: number,
}

export class DefaultDefense {
    static create(type: DefenseType): Defense {
        return {
            type: type,
            current: 0,
            temp: 0
        }
    }
}