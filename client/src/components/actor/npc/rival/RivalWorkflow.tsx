import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Rival from "../../../../models/actor/npc/Rival";
import RivalEdit from "./RivalEdit";
import RivalView from "./RivalView";
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";
import ViewAllRivals from "./ViewAllRivals";

function useFetchRival(name: string): Rival {
    const [rival, setRival] = useState<Rival>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const rivalData = await ActorService.getRival(name)
                if (rivalData) {
                    setRival(rivalData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setRival])
    return rival as Rival
}

export default function RivalWorkflow(): JSX.Element {
    const {name} = useParams<{ name: string }>()
    const rival = useFetchRival(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return rival && <RivalView rival={rival} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return rival && <RivalEdit riv={rival} settings={settings}/>
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