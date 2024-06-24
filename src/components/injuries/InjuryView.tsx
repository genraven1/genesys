import Injury from "../../models/Injury";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {ViewFieldCard} from "../common/ViewFieldCard";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {Path} from "../../services/Path";
import CriticalInjuryModifierCard from "./modifiers/CriticalInjuryModifierCard";

interface Props {
    injury: Injury
}

export default function InjuryView(props: Props):JSX.Element {
    const {injury} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(Path.Injury + injury.id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={injury.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Description'} value={injury.description}/>
                    </Grid>
                    <Divider/>
                    <Grid container spacing={2}>
                        <ViewFieldCard name={'Severity'} value={injury.severity}/>
                        <ViewFieldCard name={'Min'} value={String(injury.min)}/>
                        <ViewFieldCard name={'Max'} value={String(injury.max)}/>
                    </Grid>
                    <CriticalInjuryModifierCard injury={injury}/>
                </Grid>
            </CardContent>
        </Card>
    )
}