import {useLocation, useParams} from "react-router-dom";
import Scene from "../../models/Scene";
import {Fragment, useEffect, useState} from "react";
import SceneService from "../../services/SceneService";
import SettingView from "../setting/SettingView";
import SettingEdit from "../setting/SettingEdit";
import ViewAllSettings from "../setting/ViewAllSettings";


function useFetchScene(id: number): Scene {
    const [scene, setScene] = useState<Scene>()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            try {
                const sceneData = await SceneService.getScene(id)
                if (sceneData) {
                    setScene(sceneData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setScene])
    return scene as Scene
}

export default function SceneWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const scene = useFetchScene(Number(id))

    // const useWorkflowRender = (): JSX.Element => {
    //     const pathname = useLocation().pathname
    //     if (pathname.endsWith('/view')) {
    //         return <SettingView setting={setting}/>
    //     } else if (pathname.endsWith('/edit')) {
    //         return <SettingEdit set={setting}/>
    //     } else {
    //         return <ViewAllSettings/>
    //     }
    // }

    return (
        <Fragment>
            {/*{useWorkflowRender()}*/}
        </Fragment>
    )
}