export default interface Stats {
    type: StatsType,
    current: number,
    max: number,
}

export enum StatsType {
    Wounds= 'Wounds',
    Strain = 'Strain'
}

export class DefaultStats {
    static create(type: StatsType): Stats {
        return {
            current: 0,
            max: 0,
            type: type
        }
    }
}