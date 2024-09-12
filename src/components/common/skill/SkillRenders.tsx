import Skill from "../../../models/actor/Skill";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import {Fragment} from "react";
import * as React from "react";

export const renderSkillName = (skill: Skill): string => {
    return !skill ? 'None' : skill.name;
}

export const renderViewSkills = (skills: Skill[], settingSkills: Skill[]) => {
    if (skills === undefined || skills.length === 0) {
        return <GenesysDescriptionTypography text={'None'}/>
    }
    let skillList = []
    for (let skill of settingSkills) {
        if (skills.some(sk => sk.name === skill.name)) {
            skillList.push(skill)
        }
    }
    return (
        <Fragment>
            {(skillList || []).map((skill: Skill) => {
                return <GenesysDescriptionTypography text={skill.name}/>
            })}
        </Fragment>
    )
}