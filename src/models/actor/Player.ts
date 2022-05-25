import Actor from "./Actor";
import {DefaultDefense, DefenseType} from "./Defense";
import Stats, {DefaultStats, StatsType} from "./Stats";
import {DefaultCharacteristic} from "./Characteristics";

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
            melee: DefaultDefense.create(DefenseType.Melee),
            name: "",
            presence: DefaultCharacteristic.create(),
            ranged: DefaultDefense.create(DefenseType.Ranged),
            soak: 0,
            talents: [],
            willpower: DefaultCharacteristic.create(),
            wounds: DefaultStats.create(StatsType.Wounds),
            strain: DefaultStats.create(StatsType.Strain)
        }
    }
}