import {useLocation, useParams} from "react-router-dom";
import {useFetchCampaign} from "../CampaignWorkflow";
import ViewAllSessions from "./ViewAllSessions";
import CampaignService from "../../../services/CampaignService";
import CampaignSession from "../../../models/campaign/CampaignSession";
import {Fragment, useEffect, useState} from "react";
import SessionView from "./SessionView";
import SessionEdit from "./SessionEdit";

export function useFetchSession(campaignName: string, sessionName: string) {
    const [session, setSession] = useState<CampaignSession>()

    useEffect(() => {
        if (!campaignName || !sessionName) {
            return
        }
        (async (): Promise<void> => {
            try {
                const sessionData = await CampaignService.getSession(campaignName, sessionName)
                if (sessionData) {
                    setSession(sessionData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [campaignName, sessionName, setSession])
    return session as CampaignSession
}


export default function SessionWorkflow(): JSX.Element {
    const {campaignName, sessionName} = useParams<{ campaignName: string, sessionName: string }>()
    const campaign = useFetchCampaign(campaignName!)
    const session = useFetchSession(campaignName!, sessionName!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return session && <SessionView session={session} campaignName={campaign.name}/>
        }
        else if (pathname.endsWith('/edit')) {
            return session && <SessionEdit ses={session} campaignName={campaign.name}/>
        }
        else {
            return campaign && <ViewAllSessions campaignName={campaign.name} sessions={campaign.sessions}/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}