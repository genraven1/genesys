import {pool} from '../config/Database.ts';
import {getCurrentSettingId, getTalentSettings} from '../utils/SettingHelper.ts';
import Setting from "../models/Setting.ts";
import {getMinionSettings} from "../utils/MinionHelper.ts";

export const getAllMinions = async (req, res) => {
    const query = "SELECT * from minion;";
    const results = await pool.query(query);
    const minions = []
    for (const result of results.rows) {
        result['settings'] = await getMinionSettings(result['id']) as Setting[];
        minions.push(result);
    }
    res.send(minions);
};

export const getMinion = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from minion WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const minion = results.rows[0];
    minion['settings'] = await getMinionSettings(id);
    res.send(minion);
};

export const createMinion = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM minion;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO minion (name, id) VALUES ($1, $2) RETURNING *;";
    const minion_id = Number(count.rows[0]['count']) + 1;
    const values = [name, minion_id];
    const results = await pool.query(insertQuery, values);
    const minion = results.rows[0];
    const settingQuery = "INSERT INTO minion_settings (minion_id, setting_id) VALUES ($1, $2);";
    const settingValues = [minion_id, getCurrentSettingId];
    const settingResults = await pool.query(settingQuery, settingValues);
    minion['settings'] = [settingResults.rows];
    res.send(minion);
};

export const updateMinion = async (req, res) => {
    const { id } = req.params;
    const { name, ranked, activation, tier, summary, description, settings } = req.body;
    const query = "UPDATE minion SET name = $1, ranked = $3, activation = $4, tier = $5, summary = $6, description = $7 WHERE id = $2 RETURNING *;";
    const values = [name, id, ranked, activation, tier, summary, description];
    const results = await pool.query(query, values);
    const minion = results.rows[0];
    const oldSettings = await getMinionSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({ name }) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM minion_settings WHERE id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({ name }) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO minion_settings (minion_id, setting_id) VALUES ($1, $2);";
            const insertValues = [minion['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        minion['settings'] = await getMinionSettings(minion['id']);
    }
    res.send(minion);
};