import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import Campaign from "../../models/campaign/Campaign";
import CampaignService from "../../services/CampaignService";


function useFetchCampaign(name: string): Campaign {
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
    const scene = useFetchCampaign(name!)

    // const useWorkflowRender = (): JSX.Element => {
    //     const pathname = useLocation().pathname
    //     if (pathname.endsWith('/view')) {
    //         return <CampaignView scene={scene}/>
    //     }
    //     // else if (pathname.endsWith('/edit')) {
    //     //     return <SettingEdit set={setting}/>
    //     // }
    //     else {
    //         return <ViewAllCampaigns/>
    //     }
    // }

    return (
        <Fragment>
            {/*{useWorkflowRender()}*/}
        </Fragment>
    )
}