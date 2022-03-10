import { defaultCharacteristics, defaultDefense } from "./Actor";
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
            wounds: { currentValue: 1, maxValue: 1 },
            talents: [],
            combatRating: 1,
            socialRating: 1,
            generalRating: 1,
            groupSize: 1
        };
    }
}