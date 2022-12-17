export default interface Roll extends Results {
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
}

export interface Results {
    success: number
    advantage: number
    triumph: number
    failure: number
    threat: number
    despair: number
}

export enum DieType {
    Boost= 'boost',
    Ability = 'ability',
    Proficiency = 'proficiency',
    Setback = 'setback',
    Difficulty = 'difficulty',
    Challenge = 'challenge'
}