import NonPlayerCharacter from "./NonPlayerCharacter";
import Stats, {DefaultStats} from "../Stats";
import {DefaultCharacteristic} from "../Characteristics";
import {DefaultDefense} from "../Defense";


export default interface Nemesis extends NonPlayerCharacter {
    strain: Stats
}

export class DefaultNemesis {
    static create(): Nemesis {
        return {
            combat: 0,
            general: 0,
            social: 0,
            agility: DefaultCharacteristic.create(),
            brawn: DefaultCharacteristic.create(),
            cunning: DefaultCharacteristic.create(),
            intellect: DefaultCharacteristic.create(),
            melee: DefaultDefense.create(),
            name: "",
            presence: DefaultCharacteristic.create(),
            ranged: DefaultDefense.create(),
            soak: 0,
            talents: [],
            willpower: DefaultCharacteristic.create(),
            wounds: DefaultStats.create(),
            strain: DefaultStats.create()
        }
    }
}