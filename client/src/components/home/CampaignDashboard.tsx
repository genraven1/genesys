import {Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import ViewAllCampaigns from "../campaign/ViewAllCampaigns";

export default function CampaignDashboard(): JSX.Element {

    return (
        <Card>
            <CardHeader
                style={{textAlign: 'center'}}
                title={'Campaign MainDashboard'}>
            </CardHeader>
            <CardContent>
                <ViewAllCampaigns/>
            </CardContent>
        </Card>
    )
}