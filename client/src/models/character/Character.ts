import StatusEffect from "./StatusEffect";
import Wounds from "./Wounds";

export default interface Character {
    wounds: Wounds
    disoriented: StatusEffect
    immobilized: StatusEffect
    staggered: StatusEffect
}