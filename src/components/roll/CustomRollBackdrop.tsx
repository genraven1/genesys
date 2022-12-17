import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import ViewRollTable from "./ViewRollTable";
import Roll from "../../models/Roll";

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollBackdrop(props: Props) {
    const {open, onClose} = props

    const roll:Roll = {
        ability: 0,
        advantage: 0,
        boost: 0,
        challenge: 0,
        despair: 0,
        difficulty: 0,
        failure: 0,
        proficiency: 0,
        setback: 0,
        success: 0,
        threat: 0,
        triumph: 0
    }

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <ViewRollTable roll={roll}/>
        </Backdrop>
    )
}
