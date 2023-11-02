import {pool} from '../config/Database.ts';
import {getCurrentSettingId} from "../utils/SettingHelper.ts";
import {getSkillSettings} from "../utils/SkillHelper.ts";
import Setting from '../../client/src/models/Setting.ts';
import Skill from '../../client/src/models/actor/Skill.ts';

export const getAllSkills = async (req, res) => {
    const query = "SELECT * from skill;";
    const results = await pool.query(query);
    const skills = []
    for (const skill of results.rows as Skill[]) {
        skill.settings = await getSkillSettings(skill['id']) as Setting[];
        skills.push(skill);
    }
    res.send(skills);
}

export const createSkill = async (req, res) => {
    const { name } = req.params;
    const countQuery = "SELECT COUNT(*) FROM skill;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO skill (name, id, characteristic, type) VALUES ($1, $2, $3, $4) RETURNING *;";
    const skill_id = Number(count.rows[0]['count']) + 1;
    const values = [name, skill_id, 'Brawn', 'General'];
    const results = await pool.query(insertQuery, values);
    const skill = results.rows[0] as Skill;
    const settingQuery = "INSERT INTO skill_settings (skill_id, setting_id) VALUES ($1, $2);";
    const settingValues = [skill_id, await getCurrentSettingId()];
    const settingResults = await pool.query(settingQuery, settingValues);
    skill.settings = settingResults.rows;
    res.send(skill);
}

export const getSkill = async (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM skill WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const skill = results.rows[0] as Skill;
    skill.settings = await getSkillSettings(id);
    res.send(skill);
}

export const updateSkill = async (res, req) => {
    const { id } = req.params;
    const { name, characteristic, type, settings } = req.body;
    const query = "UPDATE skill SET name = $1, characteristic = $3, type = $4 WHERE id = $2 RETURNING *;";
    const values = [name, id, characteristic, type];
    const results = await pool.query(query, values);
    const skill = results.rows[0] as Skill;
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
        skill.settings = await getSkillSettings(skill['id']);
    }
    res.send(skill);
}