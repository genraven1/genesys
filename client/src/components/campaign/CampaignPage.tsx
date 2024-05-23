import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent, CardHeader, Divider, Grid} from "@mui/material";
import ViewAllSessions from "./session/ViewAllSessions";
import * as React from "react";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const { campaign } = props;

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={campaign.name}>
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