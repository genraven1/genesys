import {pool} from "../config/Database.ts";
import Setting from "../models/Setting.ts";

export const getCurrentSettingId = async (): Promise<number> => {
    const query = "SELECT id FROM current;";
    const result = await pool.query(query);
    return result.rows[0]['id'];
}

export const getTalentSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM talent_settings WHERE talent_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
}

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
}

export const getSetting = async (id: number): Promise<Setting> => {
    const query = "SELECT * FROM setting WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as Setting;
}