import Setting from "./Setting"

export interface Talent {
    id: number
    name: string
    ranked: boolean
    activation: string
    tier: string
    summary: string
    description: string
    settings: Setting[]
}