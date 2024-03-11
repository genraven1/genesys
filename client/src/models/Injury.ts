import {Difficulty} from "./common/Difficulty";

export default interface Injury {
    name: string
    description: string
    difficulty: Difficulty
    min: number
    max: number
}