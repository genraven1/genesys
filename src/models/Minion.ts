import { defaultCharacteristics, defaultDefense, defaultWounds } from "./Actor";
import NonPlayerCharacter from "./NonPlayerCharacter";

export default interface Minion extends NonPlayerCharacter {
    groupSize: number,
}

export class DefaultMinion {
    static create(): Minion {
        return {
            name: '',
            id: '',
            characteristics: defaultCharacteristics,
            soak: 1,
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