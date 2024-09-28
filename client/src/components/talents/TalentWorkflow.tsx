import {Fragment, useEffect, useState} from "react";
import Talent from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {useLocation, useParams} from "react-router-dom";
import TalentView from "./TalentView";
import TalentEdit from "./TalentEdit";
import ViewAllTalents from "./ViewAllTalents";


function useFetchTalent(id: string): Talent {
    const [talent, setTalent] = useState<Talent>()

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setTalent(await TalentService.getTalent(id))
        })()
    }, [id, setTalent])
    return talent as Talent
}

export default function TalentWorkflow() {
    const {id} = useParams<{ id?: string }>()
    const talent = useFetchTalent(id as string)

    const useWorkflowRender = () => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return talent && <TalentView talent={talent}/>
        } else if (pathname.endsWith('/edit')) {
            return talent && <TalentEdit tal={talent}/>
        } else {
            return <ViewAllTalents/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}