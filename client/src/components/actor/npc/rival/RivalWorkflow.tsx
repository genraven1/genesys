import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Rival from "../../../../models/actor/npc/Rival";
import RivalEdit from "./RivalEdit";
import RivalView from "./RivalView";
import ViewAllRivals from "./ViewAllRivals";
import {useFetchCurrentCampaign} from "../../../campaign/CampaignWorkflow";

function useFetchRival(name: string): Rival {
    const [rival, setRival] = useState<Rival>()
    let campaign = useFetchCurrentCampaign()
    useEffect(() => {
        (async (): Promise<void> => {
            setRival(await ActorService.getRival(campaign.name, name))
        })()
    }, [name, setRival, campaign.name])
    return rival as Rival
}

export default function RivalWorkflow() {
    const {name} = useParams<{ name: string }>()
    const rival = useFetchRival(name as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return rival && <RivalView rival={rival}/>
        } else if (pathname.endsWith('/edit')) {
            return rival && <RivalEdit riv={rival}/>
        } else {
            return <ViewAllRivals/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}