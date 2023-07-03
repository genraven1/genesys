import {Option} from "../../components/common/InputSelectField";

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