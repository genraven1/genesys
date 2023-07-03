import {Activation} from "./common/Activation";


export default interface Ability {
    name: string
    description: string
    activation: Activation
}