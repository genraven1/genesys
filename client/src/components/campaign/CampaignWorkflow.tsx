import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Campaign from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";
import ViewAllCampaigns from "./ViewAllCampaigns";
import CampaignView from "./CampaignView";
import CampaignEdit from "./CampaignEdit";


export function useFetchCampaign(name: string): Campaign {
    const [campaign, setCampaign] = useState<Campaign>()

    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const campaignData = await CampaignService.getCampaign(name)
                if (campaignData) {
                    setCampaign(campaignData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setCampaign])
    return campaign as Campaign
}

export default function CampaignWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const campaign = useFetchCampaign(name!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return campaign && <CampaignView campaign={campaign}/>
        }
        else if (pathname.endsWith('/edit')) {
            return campaign && <CampaignEdit camp={campaign}/>
        }
        else {
            return <ViewAllCampaigns/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}