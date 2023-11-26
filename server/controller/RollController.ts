import Roll, {Results} from '../../client/src/models/Roll.ts'

export const resolveRoll = (req, res) => {
    const roll = req.body as Roll;
    const results = {} as Results;
    results.success = roll.success;
    results.advantage = roll.advantage;
    results.triumph = roll.triumph;
    results.failure = roll.failure;
    results.threat = roll.threat;
    results.despair = roll.despair;

    while (roll.boost > 0) {
        switch (rollDie(6)) {
            case 1:
            case 2:
                break;
            case 3:
                results.success = results.success + 1
                break
            case 4:
                results.success = results.success + 1
                results.advantage = results.advantage + 1
                break
            case 5:
                results.advantage = results.advantage + 2
                break
            case 6:
                results.advantage = results.advantage + 1
                break
            default:
                break;
        }
        roll.boost--
    }

    while (roll.ability > 0) {
        switch (rollDie(8)) {
            case 1:
                break;
            case 2:
            case 3:
                results.success = results.success + 1
                break
            case 4:
                results.success = results.success + 2
                break
            case 5:
            case 6:
                results.advantage = results.advantage + 1
                break
            case 7:
                results.success = results.success + 1
                results.advantage = results.advantage + 1
                break
            case 8:
                results.advantage = results.advantage + 2
                break
            default:
                break;
        }
        roll.ability--
    }

    while (roll.proficiency > 0) {
        switch (rollDie(12)) {
            case 1:
                break
            case 2:
            case 3:
                results.success = results.success + 1
                break
            case 4:
            case 5:
                results.success = results.success + 2
                break
            case 6:
                results.advantage = results.advantage + 1
                break
            case 7:
            case 8:
            case 9:
                results.success = results.success + 1
                results.advantage = results.advantage + 1
                break
            case 10:
            case 11:
                results.advantage = results.advantage + 2
                break
            case 12:
                results.success = results.success + 1
                results.triumph = results.triumph + 1
                break
            default:
                break;
        }
        roll.proficiency--
    }

    while (roll.setback > 0) {
        switch (rollDie(6)) {
            case 1:
            case 2:
                break;
            case 3:
            case 4:
                results.failure = results.failure + 1
                break
            case 5:
            case 6:
                results.threat = results.threat + 1
                break
            default:
                break;
        }
        roll.setback--
    }

    while (roll.difficulty > 0) {
        switch (rollDie(8)) {
            case 1:
                break
            case 2:
                results.failure = results.failure + 1
                break;
            case 3:
                results.failure = results.failure + 2
                break
            case 4:
            case 5:
            case 6:
                results.threat = results.threat + 1
                break
            case 7:
                results.threat = results.threat + 2
                break
            case 8:
                results.failure = results.failure + 1
                results.threat = results.threat + 1
                break
            default:
                break;
        }
        roll.difficulty--
    }

    while (roll.despair > 0) {
        switch (rollDie(12)) {
            case 1:
                break
            case 2:
            case 3:
                results.failure = results.failure + 1
                break
            case 4:
            case 5:
                results.failure = results.failure + 2
                break
            case 6:
            case 7:
                results.threat = results.threat + 1
                break
            case 8:
            case 9:
                results.failure = results.failure + 1
                results.threat = results.threat + 1
                break
            case 10:
            case 11:
                results.threat = results.threat + 2
                break
            case 12:
                results.failure = results.failure + 1
                results.despair = results.despair + 1
                break
            default:
                break;
        }
        roll.despair--
    }

    if (results.success > results.failure) {
        results.success = results.success - results.failure
        results.failure = 0
    } else if (results.success < results.failure) {
        results.success = 0
        results.failure = results.failure - results.success
    } else {
        results.success = 0
        results.failure = 0
    }

    if (results.advantage > results.threat) {
        results.advantage = results.advantage - results.threat
        results.threat = 0
    } else if (results.advantage < results.threat) {
        results.advantage = 0
        results.threat = results.threat - results.advantage
    } else {
        results.advantage = 0
        results.threat = 0
    }
    res.send(results);
};

const rollDie = (sides: number): number => {
    return Math.floor(Math.random() * sides) + 1;
};