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
                setSkill(await SkillService.getSkill(name))
            } catch (err) {
                console.log(err)
            }
        })()
    }, [name, setSkill])
    return skill as Skill
}

export default function SkillWorkflow() {
    const {skill_id} = useParams<{ skill_id: string }>()
    const skill = useFetchSkill(skill_id!)

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