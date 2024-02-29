import {Fragment, useEffect, useState} from "react";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";
import {useFetchAllSettings} from "../setting/SettingWorkflow";

function useFetchSkill(name: string): Skill {
    const [skill, setSkill] = useState<Skill>()
    useEffect(() => {
        if (!name) {
            return
        }
        (async (): Promise<void> => {
            try {
                const skillData = await SkillService.getSkill(name)
                if (skillData) {
                    setSkill(skillData)
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setSkill])
    return skill as Skill
}

export default function SkillWorkflow(): JSX.Element {
    const {name} = useParams<{ name: string }>()
    const skill = useFetchSkill(name as string)
    const settings = useFetchAllSettings()

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return skill && <SkillView skill={skill} settings={settings}/>
        } else if (pathname.endsWith('/edit')) {
            return skill && <SkillEdit sk={skill} settings={settings}/>
        } else {
            return <ViewAllSkills/>
        }
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}