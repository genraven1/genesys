import {pool} from "../config/Database.ts";

export const getCurrentSettingId = async (): Promise<number> => {
    const query = "SELECT id FROM current;";
    const result = await pool.query(query);
    return result.rows[0]['id'];
}