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
            try {
                setTalent(await TalentService.getTalent(id))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [id, setTalent])
    return talent as Talent
}

export default function TalentWorkflow() {
    const {talent_id} = useParams<{ talent_id?: string }>()
    const talent = useFetchTalent(talent_id!)

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