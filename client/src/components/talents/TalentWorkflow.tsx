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

export default function TalentWorkflow(): JSX.Element {
    const {name} = useParams<{ name?: string }>()
    const talent = useFetchTalent(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <TalentView talent={talent} allSettings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return <TalentEdit tal={talent} settings={settings}/>
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