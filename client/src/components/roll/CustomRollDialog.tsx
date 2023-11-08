import * as React from 'react';
import ViewRollTable from "./ViewRollTable";
import Roll, {DefaultResults, DefaultRoll, Results} from "../../models/Roll";
import {useState} from "react";
import {
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider
} from "@mui/material";
import {GenesysResultsConversion, GenesysRollConversion} from "./GenesysRollConversion";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollDialog(props: Props) {
    const {open, onClose} = props
    const [roll, setRoll] = useState<Roll>(DefaultRoll.create)
    const [diceResults, setDiceResults] = useState(false)
    const [results, setResults] = useState<Results>()

    const rollDie = (sides: number): number => {
        return Math.floor(Math.random() * sides) + 1
    }

    const rollDiePool = (roll: Roll): Results => {
        const results = DefaultResults.createWithRoll(roll);

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
            console.log(results)
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

        return results
    }

    const onChange = (diceRoll: Roll) => {
        setRoll(diceRoll)
    }

    const onClick = async (event: React.SyntheticEvent) => {
        const dieResults = rollDiePool(roll)
        console.log(dieResults)
        setResults(dieResults)
        console.log(results!!)
        setDiceResults(true)
    }

    const viewRoll = <GenesysRollConversion roll={roll!}/>

    const viewResults = <GenesysResultsConversion results={results!}/>

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Assemble Dice Roll'} style={{textAlign:'center'}}/>
            <DialogContent>
                <Card>
                    <CardContent>
                        <ViewRollTable roll={roll!} onChange={onChange}/>
                        <Divider/>
                        {diceResults ? viewResults:viewRoll}
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
