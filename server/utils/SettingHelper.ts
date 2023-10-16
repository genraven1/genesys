import {pool} from "../config/Database.ts";
import Setting from "../models/Setting.ts";

export const getCurrentSettingId = async (): Promise<number> => {
    const query = "SELECT id FROM current;";
    const result = await pool.query(query);
    return result.rows[0]['id'];
};

export const getSetting = async (id: number): Promise<Setting> => {
    const query = "SELECT * FROM setting WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0] as Setting;
};