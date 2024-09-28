import {Fragment, useEffect, useState} from "react";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";

export function useFetchAllSkills(): Skill[] {
    const [skills, setSkills] = useState<Skill[]>([])
    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [setSkills])
    return skills;
}

function useFetchSkill(id: string): Skill {
    const [skill, setSkill] = useState<Skill>()
    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setSkill(await SkillService.getSkill(id))
        })()
    }, [id, setSkill])
    return skill as Skill
}

export default function SkillWorkflow() {
    const {id} = useParams<{ id: string }>()
    const skill = useFetchSkill(id as string)

    const useWorkflowRender = () => {
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