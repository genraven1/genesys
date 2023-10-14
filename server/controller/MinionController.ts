import {pool} from '../config/Database.ts';
import Setting from "../models/Setting.ts";
import {
    createMinionSettings,
    createMinionSkills,
    getMinionSettings,
    getMinionSkills
} from "../utils/MinionHelper.ts";
import {GroupSkill} from "../models/Minion.ts";

export const getAllMinions = async (req, res) => {
    const query = "SELECT * from minion;";
    const results = await pool.query(query);
    const minions = []
    for (const result of results.rows) {
        result['settings'] = await getMinionSettings(result['id']) as Setting[];
        result['skills'] = await getMinionSkills(result['id']) as GroupSkill[];
        result['abilities'] = []
        result['talents'] = []
        result['weapons'] = []
        result['armor'] = []
        result['gear'] = []
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
    minion['settings'] = await getMinionSettings(id) as Setting[];
    minion['skills'] = await getMinionSkills(id) as GroupSkill[];
    minion['abilities'] = []
    minion['talents'] = []
    minion['weapons'] = []
    minion['armor'] = []
    minion['gear'] = []
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
    minion['settings'] = await createMinionSettings(minion_id);
    minion['skills'] = await createMinionSkills(minion_id);
    minion['abilities'] = []
    minion['talents'] = []
    minion['weapons'] = []
    minion['armor'] = []
    minion['gear'] = []
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

export const updateMinionSkill = async (req, res) => {
    const { id } = req.params;
    const { group, id: skill_id } = req.body;
    const query = "UPDATE minion_skills SET group_skill = $1 WHERE minion_id = $2 AND skill_id = $3 RETURNING *;";
    const values = [group, Number(id), Number(skill_id)];
    console.log(values)
    const skills = await pool.query(query, values);
    res.send(skills.rows[0]);
}