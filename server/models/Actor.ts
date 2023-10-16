import Setting from "./Setting.ts";
import {ActorTalent} from "./Talent.ts";
import {ActorGear} from "./Gear.ts";
import {ActorWeapon} from "./Weapon.ts";
import {ActorArmor} from "./Armor.ts";

export default interface Actor {
    id: number
    name: string,
    type: string,
    brawn: number,
    agility: number,
    intellect: number,
    cunning: number,
    willpower: number,
    presence: number,
    soak: number,
    melee: number,
    ranged: number,
    wounds: number,
    talents: ActorTalent[],
    weapons: ActorWeapon[],
    armor: ActorArmor[],
    gear: ActorGear[],
    settings: Setting[]
}