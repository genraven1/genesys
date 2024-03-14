import StatusEffect from "./StatusEffect";
import Wounds from "./Wounds";
import {Characteristic} from "./Characteristic";

export default interface Character {
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Wounds
    disoriented: StatusEffect
    immobilized: StatusEffect
    staggered: StatusEffect
}