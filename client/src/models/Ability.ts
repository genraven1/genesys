import {Activation} from "./Talent";

export default interface Ability {
    id: number
    name: string
    description: string
    activation: Activation
}