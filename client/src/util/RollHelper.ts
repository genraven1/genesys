import Roll, {DefaultResults, Results} from '../models/Roll'

export default function RollHelper(roll: Roll):Results {
    const results = DefaultResults();

    results.success = roll.success
    results.advantage = roll. advantage
    results.triumph = roll.triumph
    results.failure = roll.failure
    results.threat = roll.threat
    results.despair = roll.despair

    export const rollDie = (sides: number): number => {
        return Math.floor(Math.random() * sides) + 1
    }
    
    while(roll.boost > 0) {
        switch (rollDie(6)) {
            case 1:
            case 2:
                break;
            case 3:
                break
            case 4:
                break
            case 5:
                break
            case 6:
                break
            default:
                break;
        }
        roll.boost--
    }

    while(roll.ability > 0) {
        roll.ability--
    }

    while(roll.proficiency > 0) {
        roll.proficiency--
    }

    while(roll.setback > 0) {
        roll.setback--
    }

    while(roll.threat > 0) {
        roll.threat--
    }

    while(roll.despair > 0) {
        roll.despair--
    }

    return results
}