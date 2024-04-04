import {Card, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import * as React from "react";
import Archetype from "../../models/actor/player/Archetype";
import {Path} from "../../services/Path";
import ViewSettingsCard from "../common/setting/ViewSettingsCard";

interface Props {
    archetype: Archetype
}

export default function ArchetypeView(props: Props) {
    const {archetype} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(Path.Archetype + archetype.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}} title={archetype.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>

                </Grid>
                <ViewSettingsCard settings={archetype.settings} allSettings={useFetchAllSettings()}/>
            </CardContent>
        </Card>
    )
}
