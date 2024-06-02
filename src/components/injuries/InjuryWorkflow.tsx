import Injury from "../../models/Injury";
import InjuryService from "../../services/InjuryService";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import InjuryEdit from "./InjuryEdit";
import InjuryView from "./InjuryView";
import ViewAllInjuries from "./ViewAllInjuries";

function useFetchInjury(name: string): Injury {
    const [injury, setInjury] = useState<Injury>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const injuryData = await InjuryService.getInjury(name)
                if (injuryData) {
                    setInjury(injuryData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setInjury])
    return injury as Injury
}

export default function InjuryWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const injury = useFetchInjury(name!!)

    const useWorkflowRender = (): JSX.Element => {
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