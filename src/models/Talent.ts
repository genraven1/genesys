export default interface Talent {
    id: number
    name: string
    ranked: boolean
    activation: Activation
    tier: Tier
    summary: string
    description: string
    settings: number[]
}

export enum Ranked {
    No = 'No',
    Yes = 'Yes'
}

export enum Activation {
    Passive = 'Passive',
    ActiveAction = 'Active (Action)',
    ActiveManeuver = 'Active (Maneuver)',
    ActiveIncidental = 'Active (Incidental)',
    ActiveIncidentalOutOfTurn = 'Active (Incidental, Out of Turn)'
}

export enum Tier {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    Fourth = 'Fourth',
    Fifth = 'Fifth'
}