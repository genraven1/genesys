import Skill from "../../../models/actor/Skill";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import * as React from "react";

export const renderSkillName = (skill: Skill): string => {
    return !skill ? 'None' : skill.name;
}

export const renderSkillNames = (skills: Skill[]) => {
    if (skills === undefined || skills.length === 0) {
        return <GenesysDescriptionTypography text={'None'}/>
    }
    let skillList = skills.sort((a, b) => a.name.localeCompare(b.name))
    let skillNames = ''
    for (let i = 0; i < skillList.length; i++) {
        skillNames = i !== skillList.length - 1 ? skillNames.concat(skillList[i].name + ', ') : skillNames.concat(skillList[i].name);
    }
    return skillNames
}