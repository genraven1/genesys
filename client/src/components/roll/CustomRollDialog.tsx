import * as React from 'react';
import ViewRollTable from "./ViewRollTable";
import Roll, {DefaultRoll} from "../../models/Roll";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import RollService from "../../services/RollService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollDialog(props: Props) {
    const {open, onClose} = props
    const [roll, setRoll] = useState<Roll>(DefaultRoll.create)
    const rollText ='dice'
    const resultsText = 'results'
    const [results, setResults] = useState(false)

    const onChange = (diceRoll: Roll) => {
        setRoll(diceRoll)
    }

    const onClick = async () => {
        console.log(roll)
        let results = await RollService.roll(roll)
        setResults(true)
        console.log(results)
    }

    const viewRoll = <GenesysDescriptionTypography text={rollText}/>

    const viewResults = <GenesysDescriptionTypography text={resultsText}/>

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Assemble Dice Roll'} style={{textAlign:'center'}}/>
            <DialogContent>
                <ViewRollTable roll={roll} onChange={onChange}/>
                <Grid container justifyContent={'center'}>
                    <Grid item>
                        {results ? viewResults:viewRoll}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
