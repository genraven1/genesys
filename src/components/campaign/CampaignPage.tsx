import Campaign from "../../models/campaign/Campaign";
import {Card, CardContent, CardHeader, Grid} from "@mui/material";
import ViewAllSessions from "./session/ViewAllSessions";
import * as React from "react";
import PartyCard from "./party/PartyCard";

interface Props {
    campaign: Campaign
}

export default function CampaignPage(props: Props) {
    const {campaign} = props;

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={campaign.name}>
            </CardHeader>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container>
                        <PartyCard party={campaign.party}/>
                    </Grid>
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