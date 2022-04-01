import { defaultWounds } from "./Actor";
import { defaultCharacteristics } from "./Characteristics";
import { defaultDefense } from "./Defense";
import NonPlayerCharacter, { RatingType } from "./NonPlayerCharacter";

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
            combatRating: { type: RatingType.CombatRating, value: 1 },
            socialRating: { type: RatingType.SocialRating, value: 1 },
            generalRating: { type: RatingType.GeneralRating, value: 1 },
            groupSize: 1
        };
    }
}