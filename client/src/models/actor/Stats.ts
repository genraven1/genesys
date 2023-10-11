export default interface Stats {
    current: number,
    max: number
}

export enum StatsType {
    Wounds= 'Wounds',
    Strain = 'Strain'
}