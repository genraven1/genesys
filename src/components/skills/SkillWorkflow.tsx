import {Fragment, useEffect, useState} from "react";
import Skill, {SkillType} from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";
import {useFetchCurrentSetting} from "../setting/SettingWorkflow";

export function useFetchCurrentSettingSkills(): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    const current = useFetchCurrentSetting()

    useEffect(() => {
        (async (): Promise<void> => {
            if (!current) {
                return
            }
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList.sort((a, b) => a.name.localeCompare(b.name)))
        })()
    }, [current, setSkills])
    return skills;
}

export function useFetchCurrentSettingSkillsByType(type: SkillType): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    const current = useFetchCurrentSetting()

    useEffect(() => {
        (async (): Promise<void> => {
            if (!current) {
                return
            }
            const skillList = await SkillService.getSkills()
            if (!skillList) {
                return
            }
            setSkills(skillList.sort((a, b) => a.name.localeCompare(b.name)))
        })()
    }, [current, setSkills, type])
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

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return skill && <SkillView skill={skill}/>
        } else if (pathname.endsWith('/edit')) {
            return skill && <SkillEdit sk={skill}/>
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