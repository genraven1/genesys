import {pool} from '../config/Database.ts';
import {getCurrentSettingId} from '../utils/SettingHelper.ts';
import Setting from "../models/Setting.ts";
import {getTalentSettings} from "../utils/TalentHelper.ts";
import {Talent} from "../models/Talent.ts";

export const getAllTalents = async (req, res) => {
    const query = "SELECT * from talent;";
    const results = await pool.query(query);
    const talents = [];
    for (const talent of results.rows as Talent[]) {
        talent.settings = await getTalentSettings(talent['id']) as Setting[];
        talents.push(talent);
    }
    res.send(talents);
};

export const getTalent = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * from talent WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const talent = results.rows[0] as Talent;
    talent.settings = await getTalentSettings(id);
    res.send(talent);
};

export const createTalent = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM talent;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO talent (name, id, ranked, activation, tier, summary, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
    const talent_id = Number(count.rows[0]['count']) + 1;
    const values = [name, talent_id, false, 'Passive', 'First', '', ''];
    const results = await pool.query(insertQuery, values);
    const talent = results.rows[0] as Talent;
    const settingQuery = "INSERT INTO talent_settings (talent_id, setting_id) VALUES ($1, $2);";
    const settingValues = [talent_id, await getCurrentSettingId()];
    const settingResults = await pool.query(settingQuery, settingValues);
    talent.settings = settingResults.rows;
    res.send(talent);
};

export const updateTalent = async (req, res) => {
    const { id } = req.params;
    const { name, ranked, activation, tier, summary, description, settings } = req.body;
    const query = "UPDATE talent SET name = $1, ranked = $3, activation = $4, tier = $5, summary = $6, description = $7 WHERE id = $2 RETURNING *;";
    const values = [name, id, ranked, activation, tier, summary, description];
    const results = await pool.query(query, values);
    const talent = results.rows[0] as Talent;
    const oldSettings = await getTalentSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({ name }) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM talent_settings WHERE id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({ name }) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO talent_settings (talent_id, setting_id) VALUES ($1, $2);";
            const insertValues = [talent['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        talent.settings = await getTalentSettings(talent['id']);
    }
    res.send(talent);
};