import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";
import ArmorView from "../../../equipment/armor/ArmorView";
import {Armor} from "../../../../models/equipment/Armor";

interface Props {
    armor: Armor
    open: boolean
    onClose: () => void
}

export default function ArmorBackdrop(props: Props) {
    const {armor, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <ArmorView armor={armor} allSettings={useFetchAllSettings()}/>
        </Backdrop>
    )
}
