import {Difficulty} from "./common/Difficulty";

export default interface Injury {
    name: string
    description: string
    severity: Difficulty
    min: number
    max: number
}