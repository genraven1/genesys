import {Fragment, useEffect, useState} from "react";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";
import {useFetchAllSettings} from "../setting/SettingWorkflow";


function useFetchSkill(id: number): Skill {
    const [skill, setSkill] = useState<Skill>()
    useEffect(() => {
        if(!id) {return}
        (async (): Promise<void> => {
            try {
                const skillData = await SkillService.getSkill(id)
                if (skillData) {setSkill(skillData)}
            } catch (err) {console.log(err)}
        })()
    },[id, setSkill])
    return skill as Skill
}

export default function SkillWorkflow(): JSX.Element {
    const { id } = useParams<{ id?: string }>()
    const skill = useFetchSkill(Number(id!!))
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SkillView skill={skill} settings={settings}/>
        }
        else if (pathname.endsWith('/edit')) {
            return <SkillEdit sk={skill} settings={settings}/>
        }
        else {return <ViewAllSkills/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}