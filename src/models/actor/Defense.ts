export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    current: number,
    temp: number,
}

export class DefaultDefense {
    static create(): Defense {
        return {
            current: 0,
            temp: 0
        }
    }
}