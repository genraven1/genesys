import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import ActorService from "../../../../services/ActorService";
import Rival from "../../../../models/actor/npc/Rival";
import RivalEdit from "./RivalEdit";
import RivalView from "./RivalView";
import ViewAllRivals from "./ViewAllRivals";

function useFetchRival(name: string): Rival {
    const [rival, setRival] = useState<Rival>()

    useEffect(() => {
        (async (): Promise<void> => {
            setRival(await ActorService.getRival(name))
        })()
    }, [name, setRival])
    return rival as Rival
}

export default function RivalWorkflow() {
    const {id} = useParams<{ id: string }>()
    const rival = useFetchRival(id as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return rival && <RivalView rival={rival}/>
        } else if (pathname.endsWith('/edit')) {
            return rival && <RivalEdit riv={rival}/>
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