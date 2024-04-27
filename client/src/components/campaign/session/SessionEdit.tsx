import CampaignSession from "../../../models/campaign/CampaignSession";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Card} from "@mui/material";
import {CampaignPath} from "../../../services/Path";

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

        </Card>
    )
}