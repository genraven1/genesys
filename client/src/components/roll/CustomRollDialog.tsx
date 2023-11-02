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
import RollHelper from '../../util/RollHelper';

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
        setDiceResults(true)
    }

    const onClick = async () => {
        setResults(RollHelper(roll))
    }

    const viewRoll = <GenesysRollConversion roll={roll!}/>

    const viewResults = <GenesysResultsConversion results={results!}/>

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Assemble Dice Roll'} style={{textAlign:'center'}}/>
            <DialogContent>
                <Card>
                    <ViewRollTable roll={roll!} onChange={onChange}/>
                    <Divider/>
                    <CardContent>
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
