import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSetting} from "./SettingHelper.ts";
import {EquipmentQuality} from "../models/equipment/Quality.ts";
import {Weapon} from "../models/equipment/Weapon.ts";
import {getQuality} from "./QualityHelper.ts";
import {Skill} from "../models/Skill.ts";
import {retrieveSkill} from "./SkillHelper.ts";

export const createWeaponEquipment = async (name: string): Promise<Weapon> => {
    const countQuery = "SELECT COUNT(*) FROM weapon;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO weapon (name, id, damage, critical, description, range, price, rarity, restricted, encumbrance) VALUES ($1, $2) RETURNING *;";
    const weapon_id = Number(count.rows[0]['count']) + 1;
    const values = [name, weapon_id, 0, 0, '', 'Engaged', 0, 0, false, 0];
    const results = await pool.query(insertQuery, values);
    const weapon = results.rows[0] as Weapon;
    const settingQuery = "INSERT INTO weapon_settings (weapon_id, setting_id) VALUES ($1, $2);";
    const settingValues = [weapon_id, await getCurrentSettingId()];
    const settingResults = await pool.query(settingQuery, settingValues);
    weapon.settings = settingResults.rows;
    return weapon;
};

export const createCustomWeapon = async (customWeapon: Weapon): Promise<Weapon> => {
    const countQuery = "SELECT COUNT(*) FROM weapon;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO weapon (name, id, damage, critical, description, range, price, rarity, restricted, encumbrance) VALUES ($1, $2) RETURNING *;";
    const weapon_id = Number(count.rows[0]['count']) + 1;
    const values = [customWeapon.name, weapon_id, customWeapon.damage, customWeapon.critical, customWeapon.description, customWeapon.range, customWeapon.price, customWeapon.rarity, customWeapon.restricted, customWeapon.encumbrance];
    const results = await pool.query(insertQuery, values);
    return results.rows[0] as Weapon;
};

export const retrieveWeapon = async (id: number): Promise<Weapon> => {
    const query = "SELECT * from weapon WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const weapon = results.rows[0] as Weapon;
    weapon.skill = await retrieveSkill(weapon['skill_id']) as Skill;
    delete weapon['skill_id'];
    weapon.settings = await getWeaponSettings(weapon.id) as Setting[];
    weapon.qualities = await getWeaponQualities(weapon.id) as EquipmentQuality[];
    return weapon;
};

export const getWeaponSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM weapon_settings WHERE weapon_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const getWeaponQualities = async (id: number): Promise<EquipmentQuality[]> => {
    const query = "SELECT * FROM weapon_qualities WHERE weapon_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const qualities = [];
    for (const quality of ids.rows as EquipmentQuality[]) {
        const equipmentQuality = await getQuality(quality['quality_id'], quality.ranks);
        qualities.push(equipmentQuality);
    }
    return qualities;
};

export const addQualityToWeapon = async (weapon_id: number, quality_id: number): Promise<EquipmentQuality[]> => {
    const weapon = await retrieveWeapon(weapon_id) as Weapon;
    const equipmentQualities = weapon.qualities;
    if (equipmentQualities.find(quality => quality.id === quality_id)) {
        const query = "UPDATE weapon_qualities SET ranks = ranks + 1 WHERE weapon_id = $1 AND quality_id = $2 RETURNING *;";
        const values = [weapon_id, quality_id];
        const results = await pool.query(query, values)
        return results.rows as EquipmentQuality[];
    } else {
        const query = "INSERT INTO weapon_qualities (weapon_id, quality_id, ranks) VALUES ($1, $2, 1);";
        const values = [weapon_id, quality_id];
        await pool.query(query, values);
        const quality = await getQuality(quality_id, 1);
        equipmentQualities.push(quality);
    }
    return equipmentQualities;
};