import {useLocation, useParams} from "react-router-dom";
import Scene from "../../../models/campaign/Scene";
import {Fragment, useEffect, useState} from "react";
import CampaignService from "../../../services/CampaignService";
import SceneView from "./SceneView";
import ViewAllScenes from "./ViewAllScenes";
import {useFetchCampaign} from "../CampaignWorkflow";
import {useFetchSession} from "../session/SessionWorkflow";


export function useFetchScene(campaignName: string, sessionName: string, sceneName: string) {
    const [scene, setScene] = useState<Scene>()

    useEffect(() => {
        if (!campaignName || !sessionName) {
            return
        }
        (async (): Promise<void> => {
            try {
                const sceneData = await CampaignService.getScene(campaignName, sessionName, sceneName)
                if (sceneData) {
                    setScene(sceneData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [campaignName, sessionName, setScene])
    return scene as Scene
}

export default function SceneWorkflow(): JSX.Element {
    const {campaignName, sessionName, sceneName} = useParams<{
        campaignName: string,
        sessionName: string,
        sceneName: string
    }>()
    const campaign = useFetchCampaign(campaignName!)
    const session = useFetchSession(campaignName!, sessionName!)
    const scene = useFetchScene(campaignName!, sessionName!, sceneName!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SceneView scene={scene}/>
        }
            // else if (pathname.endsWith('/edit')) {
            //     return <CampaignEdit set={setting}/>
        // }
        else {
            return <ViewAllScenes campaignName={campaign.name} sessionName={session.name} scenes={session.scenes}/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}