import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import NemesisEdit from "./NemesisEdit";
import NemesisView from "./NemesisView";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import ActorService from "../../../../services/ActorService";
import {useFetchAllSettings} from "../../../setting/SettingWorkflow";

function useFetchNemesis(id: number): Nemesis {
    const [nemesis, setNemesis] = useState<Nemesis>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const nemesisData = await ActorService.getNemesis(id)
                if (nemesisData) {setNemesis(nemesisData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setNemesis])
    return nemesis as Nemesis
}

export default function NemesisWorkflow(): JSX.Element {
    const {id} = useParams<{ id?: string }>()
    const nemesis = useFetchNemesis(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <NemesisView  nemesis={nemesis} settings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <NemesisEdit nem={nemesis} settings={settings}/>
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}