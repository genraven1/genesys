import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import NemesisEdit from "./NemesisEdit";
import NemesisView from "./NemesisView";
import Nemesis from "../../../../models/actor/npc/Nemesis";
import ActorService from "../../../../services/ActorService";

function useFetchNemesis(name: string): Nemesis {
    const [nemesis, setNemesis] = useState<Nemesis>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const nemesisData = await ActorService.getNemesis(name)
                if (nemesisData) {setNemesis(nemesisData)}
            } catch (err) {console.log(err)}
        })()
    },[name, nemesis])
    return nemesis as Nemesis
}

export default function NemesisWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const nemesis = useFetchNemesis(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <NemesisView  nemesis={nemesis}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <NemesisEdit nem={nemesis}/>
        }
        else {return <Fragment/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}