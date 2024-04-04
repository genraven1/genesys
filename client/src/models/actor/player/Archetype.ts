import Setting from "../../Setting";

export default interface Archetype {
    name: string
    description: string
    brawn: number
    agility: number
    intellect: number
    cunning: number
    willpower: number
    presence: number
    wounds: number
    strain: number
    settings: Setting[]
}