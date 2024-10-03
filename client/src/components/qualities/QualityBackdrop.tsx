import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Quality from "../../models/Quality";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import {ViewFieldCard, ViewQualityActivationCard} from "../common/ViewFieldCard";
import QualityModifierCard from "./modifiers/QualityModifierCard";
import {renderUsable} from "../../models/equipment/EquipmentHelper";

interface Props {
    quality: Quality
    open: boolean
    onClose: () => void
}

export default function QualityBackdrop(props: Props) {
    const {quality, open, onClose} = props;

    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={quality.name}/>
                <CardContent>
                    <Grid container justifyContent={'center'}>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Description'} value={quality.description}/>
                        </Grid>
                        <Grid container spacing={2}>
                            <ViewFieldCard name={'Quality Used on'} value={renderUsable(quality)}/>
                            <ViewQualityActivationCard quality={quality}/>
                        </Grid>
                        <QualityModifierCard qual={quality}/>
                    </Grid>
                </CardContent>
            </Card>
        </Backdrop>
    )
}
