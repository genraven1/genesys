import * as React from 'react';
import Roll, {DefaultResults, Results} from "../../models/Roll";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle,} from "@mui/material";
import RollService from "../../services/RollService";
import {useEffect, useState} from "react";
import GenesysResultsTypography from "../common/typography/GenesysResultsTypography";

interface Props {
    open: boolean
    roll: Roll
    onClose: () => void
}

export default function CustomResultsDialog(props: Props) {
    const {open, roll, onClose} = props
    const [results, setResults] = useState<Results>(DefaultResults.create)

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                const resultsData = await RollService.rollDice(roll)
                if (resultsData) {
                    setResults(resultsData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [roll, setResults]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign:'center'}}>Dice Pool Results</DialogTitle>
            <DialogContent>
                <GenesysResultsTypography results={results!!}/>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' variant='contained' onClick={onClose}>CLOSE</Button>
            </DialogActions>
        </Dialog>
    )
}
