import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Campaign from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";
import ViewAllCampaigns from "./ViewAllCampaigns";
import {CampaignPath} from "../../services/RootPath";
import CampaignPage from "./CampaignPage";


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
        if (pathname.endsWith(CampaignPath.Campaign)) {
            return <ViewAllCampaigns/>
        }
        else {
            return campaign && <CampaignPage campaign={campaign}/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}