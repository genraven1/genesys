import CampaignSession from "../../../models/campaign/CampaignSession";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {CampaignPath} from "../../../services/Path";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import * as React from "react";
import ViewAllScenes from "../scene/ViewAllScenes";

interface Props {
    session: CampaignSession
    campaignName: string
}

export default function SessionView(props: Props): JSX.Element {
    const {session, campaignName} = props;
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(CampaignPath.Campaign + campaignName + CampaignPath.Session + session.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={session.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <ViewAllScenes scenes={session.scenes} campaignName={campaignName} sessionName={session.name}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}