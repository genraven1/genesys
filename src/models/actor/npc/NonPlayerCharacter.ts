import Actor from "../Actor";

export enum RatingType {
    Combat = 'Combat',
    Social = 'Social',
    General = 'General',
}

export default interface NonPlayerCharacter extends Actor {
    combat: number,
    social: number,
    general: number,
}

export enum NonPlayerCharacterType {
    Minion = 'Minion',
    Rival = 'Rival',
    Nemesis = 'Nemesis',
}

export enum NonPlayerCharacterKey {
    Combat = 'combat',
    General = 'general',
    Social = 'social'
}