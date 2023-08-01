import {Option} from "../components/common/InputSelectField";

export default interface Talent {
    name: string
    ranked: boolean
    activation: Activation
    tier: Tier
    summary: string
    description: string
    settings: string[]
}

export enum Activation {
    Passive = 'Passive',
    ActiveAction = 'Active (Action)',
    ActiveManeuver = 'Active (Maneuver)',
    ActiveIncidental = 'Active (Incidental)',
    ActiveIncidentalOutOfTurn = 'Active (Incidental, Out of Turn)'
}

export const getActivationOptions = (): Option[] => {
    return Object.values(Activation).map((value) => ({value}))
}

export enum Tier {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    Fourth = 'Fourth',
    Fifth = 'Fifth'
}

export const getTierOptions = (): Option[] => {
    return Object.values(Tier).map((value) => ({value}))
}