import CampaignSession from "../../../models/campaign/CampaignSession";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from "@mui/material";
import {CampaignPath} from "../../../services/RootPath";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import ViewAllScenes from "../scene/ViewAllScenes";

interface Props {
    ses: CampaignSession
    campaignName: string
}

export default function SessionEdit(props: Props) {
    const {ses, campaignName} = props
    const [session, setSession] = useState<CampaignSession>(ses)
    let navigate = useNavigate()

    useEffect(() => {
        setSession(ses)
    }, [ses])

    const onView = () => {
        navigate(CampaignPath.Campaign + campaignName + CampaignPath.Session + session.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={session.name} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container spacing={10}>
                        <Grid item xs>
                            <ViewAllScenes campaignName={campaignName} sessionName={session.name} scenes={session.scenes}/>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}