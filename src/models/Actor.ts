import { Characteristic } from "./Characteristics";
import { Defense } from "./Defense";
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

export interface Wounds {
    currentValue: number,
    maxValue: number,
}

export const defaultWounds = { currentValue: 0, maxValue: 1}

export class DefaultWounds {
    static create(): Wounds {
        return {
            currentValue: 0,
            maxValue: 1,
        };
    }
}

export interface Strain {
    currentValue: number,
    maxValue: number,
}

export const defaultStrain = { currentValue: 0, maxValue: 1}