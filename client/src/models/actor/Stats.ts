export default interface Stats {
    current: number,
    threshold: number
    type: StatsType
}

export enum StatsType {
    Wounds= 'Wounds',
    Strain = 'Strain'
}