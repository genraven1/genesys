import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";
import {Weapon} from "../../../../models/equipment/Weapon";
import WeaponView from "../../../equipment/weapon/WeaponView";

interface Props {
    weapon: Weapon
    open: boolean
    onClose: () => void
}

export default function WeaponBackdrop(props: Props) {
    const {weapon, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <WeaponView weapon={weapon} allSettings={useFetchAllSettings()}/>
        </Backdrop>
    )
}
