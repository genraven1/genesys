import Actor from "./Actor";

export enum RatingType {
    CombatRating = 'Combat Rating',
    SocialRating = 'Social Rating',
    GeneralRating = 'General Rating',
}

export interface Rating {
    type: RatingType,
    value: number,
}

export default interface NonPlayerCharacter extends Actor {
    combatRating: Rating,
    socialRating: Rating,
    generalRating: Rating,
}

export class DefaultRating {
    static create(rating: Rating): Rating {
        return {
            type: rating.type,
            value: 1,
        };
    }
}