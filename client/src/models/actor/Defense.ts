export enum DefenseType {
    Melee = 'Melee',
    Ranged = 'Ranged',
}

export interface Defense {
    current: number,
    temp: number,
}