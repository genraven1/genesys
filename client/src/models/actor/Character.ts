import {Characteristic} from "./Characteristic";
import Stats from "./Stats";
import {ActorWeapon} from "../equipment/Weapon";
import {ActorArmor} from "../equipment/Armor";
import {ActorGear} from "../equipment/Gear";
import {ActorSkill, ActorType} from "./Actor";
import Ability from "../Ability";
import {ActorTalent} from "../Talent";
import Injury from "../Injury";
import StatusEffect from "./StatusEffect";

export default interface Character {
    id: string
    name: string,
    type: ActorType,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    wounds: Stats,
    soak: number,
    melee: number,
    ranged: number,
    weapons: ActorWeapon[],
    armors: ActorArmor[],
    gear: ActorGear[],
    abilities: Ability[],
    talents: ActorTalent[],
    skills: ActorSkill[],
    injuries: Injury[],
    disoriented: StatusEffect
    immobilized: StatusEffect
    staggered: StatusEffect
}