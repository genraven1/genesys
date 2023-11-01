import {pool} from '../config/Database.ts';
import {createCustomWeapon} from "../utils/WeaponHelper.ts";
import Rival from '../../client/src/models/actor/npc/Rival.ts';
import {createRivalActor, getRivalSettings, getRivalSkills, retrieveRival} from "../utils/RivalHelper.ts";
import { ActorSkill } from '../../client/src/models/actor/Actor.ts';
import { Weapon } from '../../client/src/models/equipment/Weapon.ts';
import { Armor } from '../../client/src/models/equipment/Armor.ts';

export const getAllRivals = async (req, res) => {
    const query = "SELECT * from rival;";
    const results = await pool.query(query);
    const rivals = [] as Rival[];
    for (const result of results.rows) {
        const rival = result as Rival;
        rival.settings = await getRivalSettings(rival.id);
        rival.skills = await getRivalSkills(rival.id);
        rival.abilities = [];
        rival.talents = [];
        rival.weapons = [];
        rival.armor = [];
        rival.gear = [];
        rivals.push(result);
    }
    res.send(rivals);
};

export const getRival = async (req, res) => {
    const {id} = req.params;
    res.send(await retrieveRival(id));
};

export const createRival = async (req, res) => {
    const {name} = req.params;
    res.send(await createRivalActor(name));
};

export const updateRival = async (req, res) => {
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
    } = req.body as Rival;
    const query = "UPDATE rival SET name = $1, brawn = $3, agility = $4, intellect = $5, cunning = $6, willpower = $7, presence = $8, combat = $9, social = $10, general = $11, soak = $12, wounds = $13, melee = $14, ranged = $15 WHERE id = $2 RETURNING *;";
    const values = [name, id, brawn, agility, intellect, cunning, willpower, presence, combat, social, general, soak, wounds, melee, ranged];
    const results = await pool.query(query, values);
    const rival = results.rows[0];
    const oldSettings = await getRivalSettings(id);
    let setting = [];
    if (oldSettings.length !== settings.length) {
        // Remove setting
        if (oldSettings.length > settings.length) {
            setting = oldSettings.filter(({name}) => !settings.some((e) => e.name === name));
            const deleteQuery = "DELETE FROM rival_settings WHERE setting_id = $1;";
            const deleteValues = [Number(setting[0]['id'])];
            await pool.query(deleteQuery, deleteValues);
        }
        // Add Setting
        else {
            setting = settings.filter(({name}) => !oldSettings.some((e) => e.name === name));
            const insertQuery = "INSERT INTO rival_settings (rival_id, setting_id) VALUES ($1, $2);";
            const insertValues = [rival['id'], Number(setting[0]['id'])];
            await pool.query(insertQuery, insertValues);
        }
        rival['settings'] = await getRivalSettings(rival['id']);
    }
    res.send(rival);
};

export const updateRivalSkill = async (req, res) => {
    const {id} = req.params;
    const {ranks, id: skill_id} = req.body as ActorSkill;
    const query = "UPDATE rival_skills SET ranks = $1 WHERE rival_id = $2 AND skill_id = $3 RETURNING *;";
    console.log(ranks);
    console.log(id);
    console.log(skill_id);
    const values = [ranks, Number(id), Number(skill_id)];
    const skills = await pool.query(query, values);
    res.send(skills.rows[0]);
};

export const addRivalWeapon = async (req, res) => {
    const {id} = req.params;
    const weapon = req.body as Weapon;
    let newWeapon: Weapon;
    if (!weapon.id) {
        newWeapon = await createCustomWeapon(weapon);
    }
    else {
        newWeapon = weapon;
    }
    const query = "INSERT INTO rival_weapons (rival_id, weapon_id) VALUES ($1, $2);";
    const values = [id, newWeapon.id];
    await pool.query(query, values);
    return await retrieveRival(id);
};

export const addRivalArmor = async (req, res) => {
    const {id} = req.params;
    const armor = req.body as Armor;
    const query = "INSERT INTO rival_armors (rival_id, armor_id) VALUES ($1, $2);";
    const values = [id, armor.id];
    await pool.query(query, values);
    return await retrieveRival(id);
};