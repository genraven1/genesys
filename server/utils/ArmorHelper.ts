import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getSetting} from "./SettingHelper.ts";
import {EquipmentQuality} from "../models/equipment/Quality.ts";
import {getQuality} from "./QualityHelper.ts";
import {Armor} from "../models/equipment/Armor.ts";

export const retrieveArmor = async (id: number): Promise<Armor> => {
    const query = "SELECT * from armor WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const armor = results.rows[0] as Armor;
    armor.settings = await getArmorSettings(armor.id) as Setting[];
    armor.qualities = await getArmorQualities(armor.id) as EquipmentQuality[];
    return armor;
}

export const getArmorSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM armor_settings WHERE armor_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const getArmorQualities = async (id: number): Promise<EquipmentQuality[]> => {
    const query = "SELECT * FROM armor_qualities WHERE armor_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const qualities = [];
    for (const quality of ids.rows as EquipmentQuality[]) {
        const equipmentQuality = await getQuality(quality['quality_id'], quality.ranks);
        qualities.push(equipmentQuality);
    }
    return qualities;
};

export const addQualityToArmor = async (armor_id: number, quality_id: number): Promise<EquipmentQuality[]> => {
    const armor = await retrieveArmor(armor_id) as Armor;
    const equipmentQualities= armor.qualities;
    if (equipmentQualities.find(quality => quality.id === quality_id)) {
        const query = "UPDATE armor_qualities SET ranks = ranks + 1 WHERE armor_id = $1 AND quality_id = $2 RETURNING *;";
        const values = [armor_id, quality_id];
        const results = await pool.query(query, values)
        return results.rows as EquipmentQuality[];
    } else {
        const query = "INSERT INTO armor_qualities (armor_id, quality_id, ranks) VALUES ($1, $2, 1);";
        const values = [armor_id, quality_id];
        await pool.query(query, values);
        const quality = await getQuality(quality_id, 1);
        equipmentQualities.push(quality);
    }
    return equipmentQualities;
};