import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import QualityView from "../qualities/QualityView";
import Quality from "../../models/Quality";
import { useFetchAllSettings } from '../setting/SettingWorkflow';

interface Props {
    quality: Quality
    open: boolean
    onClose: () => void
}

export default function QualityBackdrop(props: Props) {
    const {quality, open, onClose} = props

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <QualityView quality={quality} allSettings={useFetchAllSettings()}/>
        </Backdrop>
    )
}
