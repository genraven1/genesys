import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Armor} from "../../../../models/equipment/Armor";
import ArmorViewShort from "../../../equipment/armor/ViewArmorShort";

interface Props {
    armor: Armor
    open: boolean
    onClose: () => void
}

export default function ArmorBackdrop(props: Props) {
    const {armor, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <ArmorViewShort armor={armor}/>
        </Backdrop>
    )
}
