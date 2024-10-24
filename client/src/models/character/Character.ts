import StatusEffect from "./StatusEffect";
import Wounds from "./Wounds";
import {Characteristic} from "./Characteristic";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import Injury from "../Injury";

export default interface Character {
    name: string
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Wounds
    weapons: ActorWeapon[]
    armors: ActorArmor[]
    injuries: Injury[]
    disoriented: StatusEffect
    immobilized: StatusEffect
    staggered: StatusEffect
}