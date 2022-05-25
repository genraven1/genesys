import { Characteristic } from "./Characteristics";
import { Defense } from "./Defense";
import { ActorTalent } from "../Talent";
import Stats from "./Stats";

export default interface Actor {
    name: string,
    brawn: Characteristic,
    agility: Characteristic,
    intellect: Characteristic,
    cunning: Characteristic,
    willpower: Characteristic,
    presence: Characteristic,
    soak: number,
    melee: Defense,
    ranged: Defense,
    wounds: Stats,
    talents: ActorTalent[],
}