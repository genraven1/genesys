import {Option} from "../components/common/InputSelectField";
import {Activation} from "./common/Activation";

export default interface Talent {
    name: string
    ranked: boolean
    activation: Activation
    tier: Tier
    summary: string
    description: string
    settings: string[]
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