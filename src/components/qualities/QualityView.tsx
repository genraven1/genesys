import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {ViewFieldCard, ViewQualityActivationCard} from "../common/ViewFieldCard";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {RootPath} from "../../services/RootPath";
import EditIcon from "@mui/icons-material/Edit";
import {Fragment} from "react";
import Quality from "../../models/Quality";
import {renderUsable} from "../../models/equipment/EquipmentHelper";
import QualityModifierCard from "./modifiers/QualityModifierCard";

interface Props {
    quality: Quality
}

export default function QualityView(props: Props) {
    const {quality} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(RootPath.Qualities + quality.quality_id + '/edit')
    }

    const renderQualityUsable = (): JSX.Element => {
        if (quality.weapon === undefined && quality.armor === undefined) {
            return <Fragment/>
        }
        return <ViewFieldCard name={'Quality Used on'} value={renderUsable(quality)}/>
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={quality.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={quality.description}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={10}>
                        {renderQualityUsable()}
                        <ViewQualityActivationCard quality={quality}/>
                    </Grid>
                    <QualityModifierCard quality={quality}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
