import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import TalentViewOnly from "../../talents/TalentViewOnly";
import Talent from "../../../models/Talent";

interface Props {
    talent: Talent
    open: boolean
    onClose: () => void
}

export default function TalentBackdrop(props: Props) {
    const {talent, open, onClose} = props

    return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open} onClick={onClose}
            >
                <TalentViewOnly talent={talent}/>
            </Backdrop>
    );
}
