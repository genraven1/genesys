import {useLocation, useParams} from "react-router-dom";
import Scene from "../../../models/campaign/Scene";
import {Fragment, useEffect, useState} from "react";
import CampaignService from "../../../services/CampaignService";
import SceneView from "./SceneView";
import ViewAllScenes from "./ViewAllScenes";


function useFetchScene(id: number): Scene {
    const [scene, setScene] = useState<Scene>()

    // useEffect(() => {
    //     if (!id) {
    //         return
    //     }
    //     (async (): Promise<void> => {
    //         try {
    //             const sceneData = await CampaignService.getScene(id)
    //             if (sceneData) {
    //                 setScene(sceneData)
    //             }
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })()
    // }, [id, setScene])
    return scene as Scene
}

export default function SceneWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const scene = useFetchScene(Number(id))

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SceneView scene={scene}/>
        }
        // else if (pathname.endsWith('/edit')) {
        //     return <CampaignEdit set={setting}/>
        // }
        else {
            return <ViewAllScenes/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}