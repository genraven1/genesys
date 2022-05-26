import Actor from "../Actor";
import {DefaultDefense} from "../Defense";
import Stats, {DefaultStats} from "../Stats";
import {DefaultCharacteristic} from "../Characteristics";

export default interface Player extends Actor {
    strain: Stats
}

export class DefaultPlayer {
    static create(): Player {
        return {
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
            strain: DefaultStats.create(),
            skills: []
        }
    }
}