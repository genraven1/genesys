import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Campaign from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";
import ViewAllCampaigns from "./ViewAllCampaigns";
import {CampaignPath} from "../../services/RootPath";
import CampaignPage from "./CampaignPage";

export function useFetchCampaign(id: string): Campaign {
    const [campaign, setCampaign] = useState<Campaign>();

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            try {
                setCampaign(await CampaignService.getCampaign(id));
            } catch (err) {
                console.log(err);
            }
        })()
    }, [id, setCampaign])
    return campaign as Campaign;
}

export function useFetchAllCampaigns() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            try {
                setCampaigns(await CampaignService.getAllCampaigns());
            } catch (err) {
                console.log(err);
            }
        })()
    }, [setCampaigns])
    return campaigns as Campaign[];
}

export function useFetchCurrentCampaign() {
    const [campaign, setCampaign] = useState<Campaign>();
    useEffect(() => {
        (async (): Promise<void> => {
            setCampaign(await CampaignService.getCurrentCampaign());
        })()
    }, [setCampaign]);
    return campaign as Campaign;
}

export default function CampaignWorkflow() {
    const {campaign_id} = useParams<{ campaign_id?: string }>()
    const campaign = useFetchCampaign(campaign_id!)
    let campaigns = useFetchAllCampaigns()

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith(CampaignPath.Campaign)) {
            return campaigns && <ViewAllCampaigns campaigns={campaigns}/>
        } else {
            return campaign && <CampaignPage campaign={campaign}/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}