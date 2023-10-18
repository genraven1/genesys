import {Skill} from "../models/Skill.ts";
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSetting} from "./SettingHelper.ts";
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
};

export const getSkillSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM skill_settings WHERE skill_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const retrieveSkill = async (id: number): Promise<Skill> => {
    const query = "SELECT * FROM skill WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const skill = results.rows[0] as Skill;
    skill.settings = await getSkillSettings(id);
    return skill;
};