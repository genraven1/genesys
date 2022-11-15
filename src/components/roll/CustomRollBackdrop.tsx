import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';

interface Props {
    open: boolean
    onClose: () => void
}

export default function CustomRollBackdrop(props: Props) {
    const {open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>

        </Backdrop>
    )
}
