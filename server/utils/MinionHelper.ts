import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getSetting} from "./SettingHelper.ts";
import {ActorSkill, Skill} from "../models/Skill.ts";

export const getMinionSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM minion_settings WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
}

export const getMinionSkills = async (id: number): Promise<ActorSkill[]> => {
    const query = "SELECT setting_id FROM minion_settings WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as ActorSkill[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
}

export const getSkill = async (id: number): Promise<Skill> => {
    const query = "SELECT * FROM setting WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as Setting;
}