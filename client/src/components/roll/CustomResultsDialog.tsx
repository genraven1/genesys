import * as React from 'react';
import Roll from "../../models/Roll";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import {Fragment} from "react";
import GenesysResultsTypography from "../common/typography/GenesysResultsTypography";
import {useRollDice} from "./RollWorkflow";

interface Props {
    open: boolean
    roll: Roll
    onClose: () => void
}

export default function CustomResultsDialog(props: Props) {
    const {open, roll, onClose} = props
    const results = useRollDice(roll)

    const setTypography = ():JSX.Element => {
        if (!results) {
            return <Fragment/>
        }
        console.log('RESULTS')
        console.log(results)
        return <GenesysResultsTypography results={results}/>
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign:'center'}}>Dice Pool Results</DialogTitle>
            <DialogContent>
                {setTypography()}
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CLOSE</Button>
            </DialogActions>
        </Dialog>
    )
}
