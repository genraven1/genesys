export default interface Lore {
    name: string
    type: LoreType
    settings: number[]
}

export enum LoreType {
    ORGANIZATION = 'Organization'
}