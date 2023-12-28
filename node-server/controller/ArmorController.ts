import {pool} from "../config/Database.ts";
import {getCurrentSettingId} from "../utils/SettingHelper.ts";
import Setting from '../../client/src/models/Setting.ts';
import {addQualityToArmor, getArmorQualities, getArmorSettings, retrieveArmor} from "../utils/ArmorHelper.ts";
import { Armor } from "../../client/src/models/equipment/Armor.ts";
import Quality, { EquipmentQuality } from "../../client/src/models/Quality.ts";

export const getAllArmor = async (req, res) => {
    const query = "SELECT * from armor;";
    const results = await pool.query(query);
    const armors = [];
    for (const armor of results.rows as Armor[]) {
        armor.settings = await getArmorSettings(armor.id) as Setting[];
        armor.qualities = await getArmorQualities(armor.id) as EquipmentQuality[];
        armors.push(armor);
    }
    res.send(results.rows as Armor[]);
};

export const createArmor = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM armor;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO armor (name, id, soak, defense, encumbrance, price, rarity, restricted, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;";
    const armor_id = Number(count.rows[0]['count']) + 1;
    const values = [name, armor_id, 0, 0, 0, 0, 0, false, ''];
    const results = await pool.query(insertQuery, values);
    const armor = results.rows[0] as Armor;
    const settingQuery = "INSERT INTO armor_settings (armor_id, setting_id) VALUES ($1, $2);";
    const settingValues = [armor_id, await getCurrentSettingId()];
    const settingResults = await pool.query(settingQuery, settingValues);
    armor.settings = settingResults.rows;
    res.send(armor);
};

export const getArmor = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from armor WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const armor = results.rows[0] as Armor;
    armor.settings = await getArmorSettings(armor.id) as Setting[];
    armor.qualities = await getArmorQualities(armor.id) as EquipmentQuality[];
    res.send(armor);
};

export const updateArmor = async (req, res) => {
    const { id } = req.params;
    const { name, soak, defense, encumbrance, price, rarity, restricted, description, settings } = req.body as Armor;
    const query = "UPDATE armor SET name = $1, soak = $3, defense = $4, encumbrance = $5, price = $6, rarity = $7, restricted = $8, description = $9 WHERE id = $2 RETURNING *;";
    const values = [name, id, soak, defense, encumbrance, price, rarity, restricted, description];
    const results = await pool.query(query, values);
    const armor = results.rows[0] as Armor;
    const oldSettings = await getArmorSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({ name }) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM armor_settings WHERE id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({ name }) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO armor_settings (armor_id, setting_id) VALUES ($1, $2);";
            const insertValues = [id, Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        armor.settings = await getArmorSettings(id);
    }
    res.send(armor);
};

export const addArmorQuality = async (req, res) => {
    const { id } = req.params;
    const { id: quality_id} = req.body as Quality;
    const armor = await retrieveArmor(id);
    armor.qualities = await addQualityToArmor(id, quality_id);
    res.send(armor);
};