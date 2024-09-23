import {Fragment, useEffect, useState} from "react";
import Talent from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {useLocation, useParams} from "react-router-dom";
import TalentView from "./TalentView";
import TalentEdit from "./TalentEdit";
import ViewAllTalents from "./ViewAllTalents";


function useFetchTalent(name: string): Talent {
    const [talent, setTalent] = useState<Talent>()

    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const talentData = await TalentService.getTalent(name)
                if (talentData) {
                    setTalent(talentData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
        }, [name, setTalent])
    return talent as Talent
}

export default function TalentWorkflow() {
    const {name} = useParams<{ name?: string }>()
    const talent = useFetchTalent(name!!)

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