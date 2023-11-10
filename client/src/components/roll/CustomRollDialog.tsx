import * as React from 'react';
import ViewRollTable from "./ViewRollTable";
import Roll, {DefaultResults, DefaultRoll, Results} from "../../models/Roll";
import {useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import {GenesysResultsConversion, GenesysRollConversion} from "./GenesysRollConversion";
import RollService from "../../services/RollService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollDialog(props: Props) {
    const {open, onClose} = props
    const [roll, setRoll] = useState<Roll>(DefaultRoll.create)
    const [diceResults, setDiceResults] = useState(false)
    const [results, setResults] = useState<Results>(DefaultResults.create)

    const onChange = (diceRoll: Roll) => {
        setRoll(diceRoll)
    }

    const onClick = async (event: React.SyntheticEvent) => {
        const res = await RollService.rollDice(roll)
        console.log(res)
        setResults(res)
        console.log(results)
        setDiceResults(true)
    }

    const viewRoll = <GenesysRollConversion roll={roll!}/>

    const viewResults = <GenesysResultsConversion results={results!}/>

    const viewResulting = async () => {

        return <GenesysResultsConversion results={results}/>
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign:'center'}}>Assemble Dice Roll</DialogTitle>
            <DialogContent>
                <ViewRollTable roll={roll!} onChange={onChange}/>
                {diceResults ? viewResulting:viewRoll}
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
