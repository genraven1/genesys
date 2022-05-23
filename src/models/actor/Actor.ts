import { Characteristic } from "./Characteristics";
import { Defense } from "./Defense";
import { ActorTalent } from "../Talent";

export default interface Actor {
    name: string,
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
    current: number,
    max: number,
}

export class DefaultWounds {
    static create(): Wounds {
        return {
            current: 0,
            max: 1,
        };
    }
}

export interface Strain {
    current: number,
    max: number,
}

export class DefaultStrain {
    static create(): Strain {
        return {
            current: 0,
            max: 1,
        };
    }
}