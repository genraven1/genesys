import {Activation} from "./Talent";

export default interface Ability {
    name: string
    description: string
    activation: Activation
}