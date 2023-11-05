import Roll, {DefaultResults, Results} from '../models/Roll'

export default function RollHelper(roll: Roll):Results {
    const results = DefaultResults.createWithRoll(roll);

    const rollDie = (sides: number): number => {
        return Math.floor(Math.random() * sides) + 1
    }
    
    while(roll.boost > 0) {
        switch (rollDie(6)) {
            case 1:
            case 2:
                break;
            case 3:
                results.success++
                break
            case 4:
                results.success++
                results.advantage++
                break
            case 5:
                results.advantage++
                results.advantage++
                break
            case 6:
                results.advantage++
                break
            default:
                break;
        }
        roll.boost--
    }

    while(roll.ability > 0) {
        switch (rollDie(8)) {
            case 1:
                break;
            case 2:
            case 3:
                results.success++
                break
            case 4:
                results.success++
                results.success++
                break
            case 5:
            case 6:
                results.advantage++
                break
            case 7:
                results.success++
                results.advantage++
                break
            case 8:
                results.advantage++
                results.advantage++
                break
            default:
                break;
        }
        roll.ability--
    }

    while(roll.proficiency > 0) {
        switch (rollDie(12)) {
            case 1:
                break
            case 2:
            case 3:
                results.success++
                break
            case 4:
            case 5:
                results.success++
                results.success++
                break
            case 6:
                results.advantage++
                break
            case 7:
            case 8:
            case 9:
                results.success++
                results.advantage++
                break
            case 10:
            case 11:
                results.advantage++
                results.advantage++
                break
            case 12:
                results.success++
                results.triumph++
                break
            default:
                break;
        }
        roll.proficiency--
    }

    while(roll.setback > 0) {
        switch (rollDie(6)) {
            case 1:
            case 2:
                break;
            case 3:
            case 4:
                results.failure++
                break
            case 5:
            case 6:
                results.threat++
                break
            default:
                break;
        }
        roll.setback--
    }

    while(roll.threat > 0) {
        switch (rollDie(8)) {
            case 1:
                break
            case 2:
            case 8:
                results.failure++
                break;
            case 3:
                results.failure++
                results.failure++
                break
            case 4:
            case 5:
            case 6:
                break
            case 7:
                break
            default:
                break;
        }
        roll.threat--
    }

    while(roll.despair > 0) {
        switch (rollDie(12)) {
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
        roll.despair--
    }

    return results
}