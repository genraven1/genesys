import {Fragment, useEffect, useState} from "react";
import Talent from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {useLocation, useParams} from "react-router-dom";
import TalentView from "./TalentView";
import TalentEdit from "./TalentEdit";
import AllTalentsView from "./AllTalentsViewTable";
import {useFetchAllSettings} from "../setting/SettingWorkflow";


function useFetchTalent(id: number): Talent {
    const [talent, setTalent] = useState<Talent>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const talentData = await TalentService.getTalent(id)
                if (talentData) {setTalent(talentData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setTalent])
    return talent as Talent
}

export default function TalentWorkflow(): JSX.Element {
    const { id } = useParams<{ id?: string }>()
    const talent = useFetchTalent(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <TalentView  talent={talent} allSettings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <TalentEdit tal={talent} allSettings={settings}/>
        }
        else {return <AllTalentsView/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}