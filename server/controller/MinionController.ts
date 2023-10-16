import {pool} from '../config/Database.ts';
import Setting from "../models/Setting.ts";
import {
    createMinionSettings,
    createMinionSkills,
    getMinionSettings,
    getMinionSkills
} from "../utils/MinionHelper.ts";
import Minion, {GroupSkill} from "../models/Minion.ts";

export const getAllMinions = async (req, res) => {
    const query = "SELECT * from minion;";
    const results = await pool.query(query);
    const minions = [] as Minion[];
    for (const result of results.rows) {
        const minion = result as Minion;
        minion.settings = await getMinionSettings(result['id']) as Setting[];
        minion.skills = await getMinionSkills(result['id']) as GroupSkill[];
        minion.abilities = [];
        minion.talents = [];
        minion.weapons = [];
        minion.armor = [];
        minion.gear = [];
        minions.push(result);
    }
    res.send(minions);
};

export const getMinion = async (req, res) => {
    const {id} = req.params;
    const query = "SELECT * from minion WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const minion = results.rows[0] as Minion;
    minion.settings = await getMinionSettings(id) as Setting[];
    minion.skills = await getMinionSkills(id) as GroupSkill[];
    minion.abilities = [];
    minion.talents = [];
    minion.weapons = [];
    minion.armor = [];
    minion.gear = [];
    res.send(minion);
};

export const createMinion = async (req, res) => {
    const {name} = req.params;
    const countQuery = "SELECT COUNT(*) FROM minion;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO minion (name, id, type) VALUES ($1, $2, $3) RETURNING *;";
    const minion_id = Number(count.rows[0]['count']) + 1;
    const values = [name, minion_id, 'Minion'];
    const results = await pool.query(insertQuery, values);
    const minion = results.rows[0] as Minion;
    minion.settings = await createMinionSettings(minion_id);
    minion.skills = await createMinionSkills(minion_id);
    minion.abilities = [];
    minion.talents = [];
    minion.weapons = [];
    minion.armor = [];
    minion.gear = [];
    res.send(minion);
};

export const updateMinion = async (req, res) => {
    const {id} = req.params;
    const {
        name,
        brawn,
        agility,
        intellect,
        cunning,
        willpower,
        presence,
        combat,
        social,
        general,
        soak,
        wounds,
        melee,
        ranged,
        settings
    } = req.body as Minion;
    const query = "UPDATE minion SET name = $1, brawn = $3, agility = $4, intellect = $5, cunning = $6, willpower = $7, presence = $8, combat = $9, social = $10, general = $11, soak = $12, wounds = $13, melee = $14, ranged = $15 WHERE id = $2 RETURNING *;";
    const values = [name, id, brawn, agility, intellect, cunning, willpower, presence, combat, social, general, soak, wounds, melee, ranged];
    const results = await pool.query(query, values);
    const minion = results.rows[0];
    const oldSettings = await getMinionSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({name}) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM minion_settings WHERE setting_id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({name}) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO minion_settings (minion_id, setting_id) VALUES ($1, $2);";
            const insertValues = [minion['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        minion['settings'] = await getMinionSettings(minion['id']);
    }
    res.send(minion);
};

export const updateMinionSkill = async (req, res) => {
    const {id} = req.params;
    const {group_skill, id: skill_id} = req.body;
    const query = "UPDATE minion_skills SET group_skill = $1 WHERE minion_id = $2 AND skill_id = $3 RETURNING *;";
    const values = [group_skill, Number(id), Number(skill_id)];
    const skills = await pool.query(query, values);
    res.send(skills.rows[0]);
};