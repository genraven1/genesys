import {pool} from '../config/Database.ts';
import { getCurrentSettingId } from '../utils/SettingHelper.ts';

export const getAllTalents = async (req, res) => {
    const query = "SELECT * from talents;";
    const results = await pool.query(query);
    res.send(results.rows);
};

export const getTalent = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from talents WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    res.send(results.row);
};

export const createTalent = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM talents;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO talents (name, id) VALUES ($1, $2) RETURNING *;";
    const talent_id = Number(count.rows[0]['count']) + 1;
    const values = [name, talent_id];
    const results = await pool.query(insertQuery, values);
    const talent = results.rows[0];
    const settingQuery = "INSERT INTO talents_setting (talent_id, setting_id) VALUES ($1, $2);";
    const settingValues = [talent_id, getCurrentSettingId];
    const settingResults = await pool.query(settingQuery, settingValues);
    talent['setting_ids'] = [settingResults.rows];
    res.send(talent);
};

export const updateTalent = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE talents SET name = $1 WHERE id = $2 RETURNING *;";
    const values = [name, id];
    const results = await pool.query(query, values);
    res.send(results.row[0]);
};