import Setting from "../Setting";

export default interface Lore {
    name: string
    type: LoreType
    settings: Setting[]
}

export enum LoreType {
    ORGANIZATION = 'Organization'
}