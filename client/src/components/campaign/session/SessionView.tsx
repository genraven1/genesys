import CampaignSession from "../../../models/campaign/CampaignSession";
import {Card} from "@mui/material";
import {CampaignPath} from "../../../services/Path";
import {useNavigate} from "react-router-dom";

interface Props {
    session: CampaignSession
    campaignName: string
}

export default function SessionView(props: Props): JSX.Element {
    const {session, campaignName} = props;
    let navigate = useNavigate()

    const onView = () => {
        navigate(CampaignPath.Campaign + campaignName + CampaignPath.Session + session.name + '/edit')
    }

    return (
        <Card>

        </Card>
    )
}