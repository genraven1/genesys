import {Fragment, useEffect, useState} from "react";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";
import {useFetchAllSettings} from "../setting/SettingWorkflow";
import Setting from "../../models/Setting";
import SettingService from "../../services/SettingService";

export function useFetchCurrentSettingSkills(): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    const [setting, setSetting] = useState<Setting>()

    useEffect(() => {
        (async (): Promise<void> => {
            const currentSetting = await SettingService.getCurrentSetting()
            if (!currentSetting) {
                return
            }
            setSetting(currentSetting)
        })()
    }, [setSetting])

    useEffect(() => {
        (async (): Promise<void> => {
            if (!setting) {
                return
            }
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList)
        })()
    }, [setting, setSkills])
    return skills;
}

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