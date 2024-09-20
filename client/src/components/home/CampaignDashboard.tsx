import {Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import ViewAllCampaigns from "../campaign/ViewAllCampaigns";

export default function CampaignDashboard() {

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