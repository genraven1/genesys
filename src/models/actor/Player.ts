import Actor from "./Actor";
import {DefaultDefense, DefenseType} from "./Defense";
import Stats, {DefaultStats, StatsType} from "./Stats";
import {CharacteristicType, DefaultCharacteristic} from "./Characteristics";

export default interface Player extends Actor {
    strain: Stats
}

export class DefaultPlayer {
    static create(): Player {
        return {
            agility: DefaultCharacteristic.create(CharacteristicType.Agility),
            brawn: DefaultCharacteristic.create(CharacteristicType.Brawn),
            cunning: DefaultCharacteristic.create(CharacteristicType.Cunning),
            intellect: DefaultCharacteristic.create(CharacteristicType.Intellect),
            melee: DefaultDefense.create(DefenseType.Melee),
            name: "",
            presence: DefaultCharacteristic.create(CharacteristicType.Presence),
            ranged: DefaultDefense.create(DefenseType.Ranged),
            soak: 0,
            talents: [],
            willpower: DefaultCharacteristic.create(CharacteristicType.Willpower),
            wounds: DefaultStats.create(StatsType.Wounds),
            strain: DefaultStats.create(StatsType.Strain)
        }
    }
}