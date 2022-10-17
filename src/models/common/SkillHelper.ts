import Skill, {SkillType} from "../actor/Skill";
import SkillService from "../../services/SkillService";

export async function getActiveSkills(type: SkillType): Skill[] {
    const skills = await SkillService.getSkills() as Skill[]
    return skills.filter((skill) => skill.type === type)
}