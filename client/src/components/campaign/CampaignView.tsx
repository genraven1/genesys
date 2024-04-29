import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {CampaignPath} from "../../services/Path";
import EditIcon from "@mui/icons-material/Edit";
import Campaign from "../../models/campaign/Campaign";
import ViewAllSessions from "./session/ViewAllSessions";

interface Props {
    campaign: Campaign
}

export default function CampaignView(props: Props) {
    const {campaign} = props
    let navigate = useNavigate()

    const onEdit = () => {
        navigate(CampaignPath.Campaign + campaign.name + '/edit')
    }

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={campaign.name}
                action={<IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
                    <EditIcon color='primary' fontSize='small' />
                </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <ViewAllSessions sessions={campaign.sessions} campaignName={campaign.name}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
