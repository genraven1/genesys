import Setting from '../../client/src/models/Setting.ts';
import {pool} from "../config/Database.ts";
import {getSetting} from "./SettingHelper.ts";

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
};