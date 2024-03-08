import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Minion from "../../../../models/actor/npc/Minion";
import MinionView from "./MinionView";
import MinionEdit from "./MinionEdit";
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";
import ViewAllMinions from "./ViewAllMinion";

function useFetchMinion(name: string): Minion {
    const [minion, setMinion] = useState<Minion>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const minionData = await ActorService.getMinion(name)
                if (minionData) {
                    setMinion(minionData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setMinion])
    return minion as Minion
}

export default function MinionWorkflow(): JSX.Element {
    const {name} = useParams<{ name: string }>()
    const minion = useFetchMinion(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return minion && <MinionView minion={minion} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return minion && <MinionEdit min={minion} settings={settings}/>
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