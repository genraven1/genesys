import {EquipmentQuality} from "../models/equipment/Quality.ts";
import {pool} from "../config/Database.ts";

export const getQuality = async (id: number, ranks: number): Promise<EquipmentQuality> => {
    const query = "SELECT * FROM quality WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    let quality = result.rows[0] as EquipmentQuality;
    quality.ranks = ranks;
    return quality;
};