import * as React from 'react';
import {useState} from 'react';
import Roll, {DefaultRoll} from "../../models/Roll";
import {Button, Card, CardActions, CardContent,} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import CustomResultsDialog from "./CustomResultsDialog";
import ViewRollTable from "./ViewRollTable";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollBackdrop(props: Props) {
    const {open, onClose} = props
    const [roll, setRoll] = useState<Roll>(DefaultRoll.create)
    const [openCustomResultsDialog, setOpenCustomResultsDialog] = useState(false)

    const onChange = (diceRoll: Roll) => {
        setRoll(diceRoll)
    }

    return (
        <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
            <Card sx={{"width": 1}}>
                <CenteredCardHeader title={'Assemble Dice Pool'}/>
                <CardContent>
                    {/*<ViewRollTable roll={roll} onChange={onChange}/>*/}
                </CardContent>
                <CardActions>
                    <Button color='secondary' variant='contained' onClick={(): void => setOpenCustomResultsDialog(true)}>Roll Dice Pool</Button>
                    {openCustomResultsDialog && <CustomResultsDialog open={openCustomResultsDialog} onClose={(): void => setOpenCustomResultsDialog(false)} roll={roll}/>}
                    <Button color='secondary' variant='contained' onClick={onClose}>Cancel</Button>
                </CardActions>
            </Card>
        </Backdrop>
    )
}
