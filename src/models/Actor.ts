import { ActorTalent } from "./Talent";

export default interface Actor {
    name: string,
    id: string,
    characteristics: Characteristic[],
    soak: number,
    defense: Defense[],
    wounds: Wounds,
    talents: ActorTalent[],
}

export interface Characteristic {
    label: string,
    currentValue: number,
    tempValue: number,
    minValue: number,
    maxValue: number,
}

export interface Defense {
    type: string,
    currentValue: number,
    tempValue: number,
}

export interface Wounds {
    currentValue: number,
    maxValue: number,
}