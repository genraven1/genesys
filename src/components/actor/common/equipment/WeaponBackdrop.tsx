import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Weapon} from "../../../../models/equipment/Weapon";
import WeaponViewShort from '../../../equipment/weapon/ViewWeaponShort';

interface Props {
    weapon: Weapon
    open: boolean
    onClose: () => void
}

export default function WeaponBackdrop(props: Props) {
    const {weapon, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <WeaponViewShort weapon={weapon}/>
        </Backdrop>
    )
}
