import {pool} from "../config/Database.ts";
import {Weapon} from "../models/equipment/Weapon.ts";
import {addQualityToWeapon, getWeaponQualities, getWeaponSettings, retrieveWeapon} from "../utils/WeaponHelper.ts";
import {getCurrentSettingId} from "../utils/SettingHelper.ts";
import Setting from "../models/Setting.ts";
import {EquipmentQuality, Quality} from "../models/equipment/Quality.ts";
import {retrieveSkill} from "../utils/SkillHelper.ts";
import {Skill} from "../models/Skill.ts";

export const getAllWeapons = async (req, res) => {
    const query = "SELECT * from weapon;";
    const results = await pool.query(query);
    const weapons = [];
    for (const weapon of results.rows as Weapon[]) {
        weapon.skill = await retrieveSkill(weapon['skill_id']) as Skill;
        delete weapon['skill_id'];
        weapon.settings = await getWeaponSettings(weapon.id) as Setting[];
        weapon.qualities = await getWeaponQualities(weapon.id) as EquipmentQuality[];
        weapons.push(weapon);
    }
    res.send(weapons);
};

export const createWeapon = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM weapon;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO weapon (name, id) VALUES ($1, $2) RETURNING *;";
    const weapon_id = Number(count.rows[0]['count']) + 1;
    const values = [name, weapon_id];
    const results = await pool.query(insertQuery, values);
    const weapon = results.rows[0] as Weapon;
    weapon.damage = 0;
    weapon.critical = 0;
    weapon.description = '';
    weapon.price = 0;
    weapon.rarity = 0;
    weapon.restricted = false;
    weapon.encumbrance = 0;
    const settingQuery = "INSERT INTO weapon_settings (weapon_id, setting_id) VALUES ($1, $2);";
    const settingValues = [weapon_id, await getCurrentSettingId()];
    const settingResults = await pool.query(settingQuery, settingValues);
    weapon.settings = settingResults.rows;
    res.send(weapon);
};

export const getWeapon = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from weapon WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const weapon = results.rows[0] as Weapon;
    weapon.skill = await retrieveSkill(weapon['skill_id']) as Skill;
    delete weapon['skill_id'];
    weapon.settings = await getWeaponSettings(weapon.id) as Setting[];
    weapon.qualities = await getWeaponQualities(weapon.id) as EquipmentQuality[];
    res.send(weapon);
};

export const updateWeapon = async (req, res) => {
    const { id } = req.params;
    const { name, damage, critical, encumbrance, price, range, skill, rarity, restricted, brawn, description, settings } = req.body as Weapon;
    const query = "UPDATE weapon SET name = $1, damage = $3, critical = $4, encumbrance = $5, price = $6, range = $7, rarity = $8, restricted = $9, brawn = $10, description = $11, skill_id = $12 WHERE id = $2 RETURNING *;";
    const values = [name, id, damage, critical, encumbrance, price, range, rarity, restricted, brawn, description, skill.id];
    const results = await pool.query(query, values);
    const weapon = results.rows[0] as Weapon;
    const oldSettings = await getWeaponSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({ name }) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM weapon_settings WHERE id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({ name }) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO weapon_settings (weapon_id, setting_id) VALUES ($1, $2);";
            const insertValues = [weapon['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        weapon.settings = await getWeaponSettings(weapon['id']);
    }
    res.send(weapon);
};

export const addWeaponQuality = async (req, res) => {
    const { id } = req.params;
    const { id: quality_id} = req.body as Quality;
    const weapon = await retrieveWeapon(id);
    weapon.qualities = await addQualityToWeapon(id, quality_id);
    res.send(weapon);
};