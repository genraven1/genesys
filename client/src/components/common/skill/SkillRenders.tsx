import Skill from "../../../models/actor/Skill";

export const renderSkillName = (skill: Skill): string => {
    if (!skill) {
        return 'None'
    }
    return skill.name
}