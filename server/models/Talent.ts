import Setting from "./Setting.ts"

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