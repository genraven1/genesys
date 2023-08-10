export default interface Lore {
    id: number
    name: string
    type: LoreType
    settings: number[]
}

export enum LoreType {
    ORGANIZATION = 'Organization'
}