export default interface Stats {
    current: number,
    max: number,
}

export enum StatsType {
    Wounds= 'Wounds',
    Strain = 'Strain'
}

export class DefaultStats {
    static create(): Stats {
        return {
            current: 0,
            max: 1,
        }
    }
}