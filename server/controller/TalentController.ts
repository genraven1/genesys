import {pool} from '../config/Database.ts';
import {getCurrentSettingId, getTalentSettings} from '../utils/SettingHelper.ts';
import Setting from "../models/Setting.ts";

export const getAllTalents = async (req, res) => {
    const query = "SELECT * from talent;";
    const results = await pool.query(query);
    const talents = []
    for (const result of results.rows) {
        result['settings'] = await getTalentSettings(result['id']) as Setting[];
        talents.push(result);
    }
    console.log(talents)
    res.send(talents);
};

export const getTalent = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from talent WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const talent = results.rows[0];
    talent['settings'] = await getTalentSettings(id);
    res.send(talent);
};

export const createTalent = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM talent;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO talent (name, id) VALUES ($1, $2) RETURNING *;";
    const talent_id = Number(count.rows[0]['count']) + 1;
    const values = [name, talent_id];
    const results = await pool.query(insertQuery, values);
    const talent = results.rows[0];
    const settingQuery = "INSERT INTO talent_setting (talent_id, setting_id) VALUES ($1, $2);";
    const settingValues = [talent_id, getCurrentSettingId];
    const settingResults = await pool.query(settingQuery, settingValues);
    talent['settings'] = [settingResults.rows];
    console.log(talent);
    res.send(talent);
};

export const updateTalent = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const query = "UPDATE talent SET name = $1 WHERE id = $2 RETURNING *;";
    const values = [name, id];
    const results = await pool.query(query, values);
    res.send(results.rows[0]);
};