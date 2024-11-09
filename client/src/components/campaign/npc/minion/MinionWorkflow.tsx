import {Fragment} from "react";
import {useLocation} from "react-router-dom";
import CampaignMinion from "./CampaignMinion";
import {ActorPath} from "../../../../services/RootPath";
import MinionPage from "./MinionPage";

export default function MinionWorkflow() {
    return (
        <Fragment>
            {useLocation().pathname.endsWith(ActorPath.Minion) ? <CampaignMinion/> : <MinionPage/>}
        </Fragment>
    )
}