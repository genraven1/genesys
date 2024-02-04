import {Fragment, useEffect, useState} from "react";
import Talent from "../../models/Talent";
import TalentService from "../../services/TalentService";
import {useLocation, useParams} from "react-router-dom";
import TalentView from "./TalentView";
import TalentEdit from "./TalentEdit";
import ViewAllTalents from "./ViewAllTalents";
import {useFetchAllSettings} from "../setting/SettingWorkflow";


function useFetchTalent(name: string): Talent {
    const [talent, setTalent] = useState<Talent>()

    const getTalent = (name: string) => {
        TalentService.getTalent(name).then(tal => {
            setTalent(tal)
        })
    }

    useEffect(() => {
        if (name) {
            getTalent(name)
            console.log(talent)
        }
    }, [name])
    return talent as Talent
}

export default function TalentWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const talent = useFetchTalent(name!!)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <Fragment/>
            // return <TalentView talent={talent!} allSettings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return <TalentEdit tal={talent!} settings={settings}/>
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