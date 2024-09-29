import Injury from "../../models/Injury";
import InjuryService from "../../services/InjuryService";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import InjuryEdit from "./InjuryEdit";
import InjuryView from "./InjuryView";
import ViewAllInjuries from "./ViewAllInjuries";

function useFetchInjury(id: string): Injury {
    const [injury, setInjury] = useState<Injury>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setInjury(await InjuryService.getInjury(id))
        })()
    }, [id, setInjury])
    return injury as Injury
}

export default function InjuryWorkflow() {
    const {id} = useParams<{ id?: string }>()
    const injury = useFetchInjury(id as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return injury && <InjuryView injury={injury}/>
        } else if (pathname.endsWith('/edit')) {
            return injury && <InjuryEdit crit={injury}/>
        } else {
            return <ViewAllInjuries/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}