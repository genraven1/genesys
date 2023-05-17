import {Fragment, useEffect, useState} from "react";
import Skill from "../../models/actor/Skill";
import SkillService from "../../services/SkillService";
import {useLocation, useParams} from "react-router-dom";
import SkillEdit from "./SkillEdit";
import SkillView from "./SkillView";
import ViewAllSkills from "./ViewAllSkills";


function useFetchSkill(name: string): Skill {
    const [skill, setSkill] = useState<Skill>()
    useEffect(() => {
        if(!name) {return}
        (async (): Promise<void> => {
            try {
                const skillData = await SkillService.getSkill(name)
                if (skillData) {setSkill(skillData)}
            } catch (err) {console.log(err)}
        })()
    },[name, setSkill])
    return skill as Skill
}

export default function SkillWorkflow(): JSX.Element {
    const { name } = useParams<{ name?: string }>()
    const skill = useFetchSkill(name!!)

    const useWorkflowRender = (): JSX.Element => {
        const pathname = useLocation().pathname
        if (pathname.endsWith('/view')) {
            return <SkillView skill={skill} />
        }
        else if (pathname.endsWith('/edit')) {
            return <SkillEdit sk={skill}/>
        }
        else {return <ViewAllSkills/>}
    }

    return (
        <Fragment>
            {useWorkflowRender()}
        </Fragment>
    )
}