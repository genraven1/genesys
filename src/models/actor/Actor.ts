import { Characteristic } from "./Characteristics";
import { Defense } from "./Defense";
import { ActorTalent } from "../Talent";

export default interface Actor {
    name: string,
    id: string,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    soak: number,
    meleeDefense: Defense,
    rangedDefense: Defense,
    wounds: Wounds,
    talents: ActorTalent[],
}

export interface Wounds {
    currentValue: number,
    maxValue: number,
}

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

export class DefaultStrain {
    static create(): Strain {
        return {
            currentValue: 0,
            maxValue: 1,
        };
    }
}