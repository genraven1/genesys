import { DefaultWounds } from "./Actor";
import { CharacteristicType, DefaultCharacteristic } from "./Characteristics";
import { DefaultDefense, DefenseType } from "./Defense";
import NonPlayerCharacter, { DefaultRating, RatingType } from "./NonPlayerCharacter";

export default interface Minion extends NonPlayerCharacter {
    groupSize: number,
}

export class DefaultMinion {
    static create(): Minion {
        return {
            name: '',
            soak: 1,
            brawn: DefaultCharacteristic.create(CharacteristicType.Brawn),
            agility: DefaultCharacteristic.create(CharacteristicType.Agility),
            intellect: DefaultCharacteristic.create(CharacteristicType.Intellect),
            cunning: DefaultCharacteristic.create(CharacteristicType.Cunning),
            willpower: DefaultCharacteristic.create(CharacteristicType.Willpower),
            presence: DefaultCharacteristic.create(CharacteristicType.Presence),
            meleeDefense: DefaultDefense.create(DefenseType.Melee),
            rangedDefense: DefaultDefense.create(DefenseType.Ranged),
            wounds: DefaultWounds.create(),
            talents: [],
            combatRating: DefaultRating.create(RatingType.CombatRating),
            socialRating: DefaultRating.create(RatingType.SocialRating),
            generalRating: DefaultRating.create(RatingType.GeneralRating),
            groupSize: 1
        };
    }
}