import {Difficulty} from "./common/Difficulty";
import Modifier from "./common/Modifier";

export default interface Injury {
    id: string
    name: string
    description: string
    severity: Difficulty
    min: number
    max: number
    modifiers: Modifier[]
}