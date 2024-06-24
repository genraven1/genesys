import Injury from "../../models/Injury";
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
                await fetch(`/injuries/${name}`)
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data)
                        setInjury(data as Injury)
                    })
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setInjury])
    return injury as Injury
}

export default function InjuryWorkflow() {
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