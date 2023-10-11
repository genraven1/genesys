import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Minion from "../../../../models/actor/npc/Minion";
import MinionView from "./MinionView";
import MinionEdit from "./MinionEdit";
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";
import ViewAllMinions from "./ViewAllMinion";

function useFetchMinion(id: number): Minion {
    const [minion, setMinion] = useState<Minion>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            try {
                const minionData = await ActorService.getMinion(id)
                if (minionData) {
                    setMinion(minionData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setMinion])
    return minion as Minion
}

export default function MinionWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const minion = useFetchMinion(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <MinionView minion={minion} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return <MinionEdit min={minion} settings={settings}/>
        } else {
            return <ViewAllMinions/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}