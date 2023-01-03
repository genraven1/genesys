import * as React from 'react';
import ViewRollTable from "./ViewRollTable";
import Roll, {DefaultRoll} from "../../models/Roll";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import GenesysDescriptionTypography from "../common/GenesysDescriptionTypography";
import RollService from "../../services/RollService";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollDialog(props: Props) {
    const {open, onClose} = props
    const [roll, setRoll] = useState<Roll>(DefaultRoll.create)

    const onChange = (diceRoll: Roll) => {
        setRoll(diceRoll)
    }

    const onClick = async () => {
        let results = await RollService.roll(roll)
        console.log(results)
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle title={'Assemble Dice Roll'} style={{textAlign:'center'}}/>
            <DialogContent>
                <ViewRollTable roll={roll} onChange={onChange}/>
                <GenesysDescriptionTypography text={'dice'}/>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>Roll</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}
