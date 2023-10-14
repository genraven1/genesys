import {Skill} from "../models/Skill.ts";
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSkillSettings} from "./SettingHelper.ts";
import Setting from "../models/Setting.ts";

export const getCurrentSettingSkills = async (): Promise<Skill[]> => {
    const query = "SELECT * from skill;";
    const results = await pool.query(query);
    const skills = []
    for (const result of results.rows) {
        const settings = await getSkillSettings(result['id']) as Setting[];
        for (const setting of settings) {
            if (setting.id === await getCurrentSettingId()) {
                skills.push(result);
            }
        }
    }
    return skills;
}