import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {ViewFieldCard, ViewSettingFieldCard} from "../common/ViewFieldCard";
import Talent from "../../models/Talent";
import * as React from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Path} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";

export default function TalentView(props: {talent: Talent}) {
    const {talent} = props
    const {id} = useParams<{ id: string }>()
    const path = Path.Talent
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(path + id + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={talent?.name!!}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Description'} value={talent?.description!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewFieldCard name={'Ranked'} value={talent?.ranked!!} />
                        <ViewFieldCard name={'Activation'} value={talent?.activation!!} />
                        <ViewFieldCard name={'Tier'} value={talent?.tier!!} />
                    </Grid>
                    <Divider />
                    <Grid container spacing={10}>
                        <ViewSettingFieldCard name={'Setting'} settings={talent?.settings!!} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
