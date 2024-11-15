import {useParams} from "react-router-dom";
import {Button, Card, CardContent} from "@mui/material";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";
import {useFetchCurrentCampaign} from "../CampaignWorkflow";
import {Fragment} from "react";
import CampaignSession from "../../../models/campaign/CampaignSession";
import CampaignService from "../../../services/CampaignService";
import Party from "../../../models/campaign/Party";

export default function SessionPage() {
    const {name} = useParams<{ name: string }>();
    const campaign = useFetchCurrentCampaign();
    if (!campaign) {
        return <Fragment/>;
    }
    const session = campaign.sessions.find(session => session.name === name) as CampaignSession;

    const startSession = async () => {
        const currentPartyState: Party = campaign.party;
        const updatedSession = {...session, party: currentPartyState, active: true};
        const updatedCampaign = {
            ...campaign,
            player: currentPartyState.players.length,
            gm: 1,
            sessions: campaign.sessions.map(s => s.name === session.name ? updatedSession : s)
        };
        await CampaignService.updateCampaign(updatedCampaign);
    };

    const endSession = async () => {
        const updatedSession = {...session, active: false};
        const updatedCampaign = {
            ...campaign,
            party: session.party,
            sessions: campaign.sessions.map(s => s.name === session.name ? updatedSession : s)
        };
        await CampaignService.updateCampaign(updatedCampaign);
    };

    return (
        <Card>
            <CenteredCardHeader title={session.name}/>
            <CardContent>
                <Button variant="contained" color="primary" onClick={startSession}>Start Session</Button>
                <Button variant="contained" color="primary" onClick={endSession}>End Session</Button>
            </CardContent>
        </Card>
    );
}