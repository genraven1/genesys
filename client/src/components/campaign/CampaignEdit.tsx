import {Card, CardContent, CardHeader, Divider, Grid, IconButton} from '@mui/material';
import {useEffect, useState} from 'react';
import CampaignService from '../../services/CampaignService';
import {useNavigate} from 'react-router-dom';
import {CampaignPath} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import * as React from "react";
import Campaign from "../../models/campaign/Campaign";
import ViewAllSessions from "./session/ViewAllSessions";

interface Props {
    camp: Campaign
}

export default function CampaignEdit(props: Props) {
    const {camp} = props
    const [campaign, setCampaign] = useState<Campaign>(camp)
    let navigate = useNavigate()

    useEffect(() => {setCampaign(camp)}, [camp])

    const onChange = async (key: keyof Campaign, value: any) => {
        if (value === null || (campaign !== null && campaign[key] === value)) {
            return
        }
        const copyCampaign = { ...campaign } as Campaign
        switch (key) {

        }
        setCampaign(copyCampaign)

        await CampaignService.updateCampaign(copyCampaign.name, copyCampaign)
    }

    const onView = () => {
        navigate(CampaignPath.Campaign + campaign.name + '/view')
    }

    return (
        <Card>
            <CardHeader title={campaign?.name!!} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
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
