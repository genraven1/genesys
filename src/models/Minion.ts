import { defaultWounds } from "./Actor";
import { defaultCharacteristics } from "./Characteristics";
import { defaultDefense } from "./Defense";
import NonPlayerCharacter from "./NonPlayerCharacter";

export default interface Minion extends NonPlayerCharacter {
    groupSize: number,
}

export class DefaultMinion {
    static create(): Minion {
        return {
            name: '',
            id: '',
            soak: 1,
            characteristics: defaultCharacteristics,
            defense: defaultDefense,
            wounds: defaultWounds,
            talents: [],
            combatRating: 1,
            socialRating: 1,
            generalRating: 1,
            groupSize: 1
        };
    }
}