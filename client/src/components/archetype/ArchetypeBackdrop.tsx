import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {ViewFieldCard} from "../common/ViewFieldCard";
import Archetype from "../../models/actor/player/Archetype";

interface Props {
    archetype: Archetype
    open: boolean
    onClose: () => void
}

export default function ArchetypeBackdrop(props: Props) {
    const {archetype, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <ViewFieldCard name={'Archetype'} value={archetype.name}/>
        </Backdrop>
    )
}
