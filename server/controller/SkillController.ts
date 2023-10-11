import {pool} from '../config/Database.ts';
import {getCurrentSettingId, getSkillSettings} from "../utils/SettingHelper.ts";
import Setting from "../models/Setting.ts";

export const getAllSkills = async (req, res) => {
    const query = "SELECT * from skill;";
    const results = await pool.query(query);
    const skills = []
    for (const result of results.rows) {
        result['settings'] = await getSkillSettings(result['id']) as Setting[];
        skills.push(result);
    }
    res.send(skills);
}

export const createSkill = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM skill;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO skill (name, id) VALUES ($1, $2) RETURNING *;";
    const skill_id = Number(count.rows[0]['count']) + 1;
    const values = [name, skill_id];
    const results = await pool.query(insertQuery, values);
    const skill = results.rows[0];
    const settingQuery = "INSERT INTO skill_settings (skill_id, setting_id) VALUES ($1, $2);";
    const settingValues = [skill_id, getCurrentSettingId];
    const settingResults = await pool.query(settingQuery, settingValues);
    skill['settings'] = [settingResults.rows];
    res.send(skill);
}

export const getSkill = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM skill WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const skill = results.rows[0];
    skill['settings'] = await getSkillSettings(id);
    res.send(skill);
}

export const updateSkill = async (res, req) => {
    const { id } = req.params;
    const { name, characteristic, type, settings } = req.body;
    const query = "UPDATE skill SET name = $1, characteristic = $3, type = $4 WHERE id = $2 RETURNING *;";
    const values = [name, id, characteristic, type];
    const results = await pool.query(query, values);
    const skill = results.rows[0];
    const oldSettings = await getSkillSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({ name }) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM skill_settings WHERE id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({ name }) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO skill_settings (talent_id, setting_id) VALUES ($1, $2);";
            const insertValues = [skill['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        skill['settings'] = await getSkillSettings(skill['id']);
    }
    res.send(skill);
}