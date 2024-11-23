export default interface Lore {
    id: string
    name: string
    type: LoreType
}

export enum LoreType {
    ORGANIZATION = 'Organization'
}