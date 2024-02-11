import Setting from '../../client/src/models/Setting.ts';
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSetting} from "./SettingHelper.ts";
import {getCurrentSettingSkills} from "./SkillHelper.ts";
import {retrieveWeapon} from "./WeaponHelper.ts";
import {retrieveArmor} from "./ArmorHelper.ts";
import Rival from "../../client/src/models/actor/npc/Rival.ts";
import { ActorSkill } from "../../client/src/models/actor/Actor.ts";
import {ActorWeapon} from '../../client/src/models/equipment/Weapon.ts';
import {ActorArmor} from '../../client/src/models/equipment/Armor.ts';
import NonPlayerActor from '../../client/src/models/actor/npc/NonPlayerActor.ts';
import {createDefaultCharacteristics, createDefaultRatings, createDefaultStats} from "./ActorHelper.ts";

export const createRivalActor = async (name: string): Promise<Rival> => {
    const countQuery = "SELECT COUNT(*) FROM rival;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO rival (name, id, type) VALUES ($1, $2, $3) RETURNING *;";
    const rival_id = Number(count.rows[0]['count']) + 1;
    const values = [name, rival_id, 'Rival'];
    const results = await pool.query(insertQuery, values);
    const rival = results.rows[0] as Rival;
    createDefaultCharacteristics(rival);
    createDefaultStats(rival);
    createDefaultRatings(rival);
    rival.settings = await createRivalSettings(rival_id);
    rival.skills = await createRivalSkills(rival_id);
    rival.abilities = [];
    rival.talents = [];
    rival.weapons = [];
    rival.armor = [];
    rival.gear = [];
    return rival;
};

export const getAllRivals = async (): Promise<NonPlayerActor[]> => {
    const query = "SELECT * from rival;";
    const results = await pool.query(query);
    const rivals = [] as NonPlayerActor[];
    for (const result of results.rows) {
        rivals.push(result);
    }
    return rivals;
};

export const retrieveRival = async (id: number): Promise<Rival> => {
    const query = "SELECT * from rival WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const rival = results.rows[0] as Rival;
    rival.settings = await getRivalSettings(id) as Setting[];
    rival.skills = await getRivalSkills(id) as ActorSkill[];
    rival.abilities = [];
    rival.talents = [];
    rival.weapons = await getRivalWeapons(id);
    rival.armor = await getRivalArmors(id);
    rival.gear = [];
    return rival;
}

export const createRivalSettings = async (id: number): Promise<Setting[]> => {
    const settingQuery = "INSERT INTO rival_settings (rival_id, setting_id) VALUES ($1, $2);";
    const setting_id = await getCurrentSettingId();
    const settingValues = [id, Number(setting_id)];
    const settingResults = await pool.query(settingQuery, settingValues);
    return settingResults.rows as Setting[];
};

export const getRivalSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM rival_settings WHERE rival_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const createRivalSkills = async (id: number): Promise<ActorSkill[]> => {
    const currentSkills = await getCurrentSettingSkills() as ActorSkill[];
    const skills = [] as ActorSkill[];
    for (const skill of currentSkills) {
        skills.push(await getActorSkill(skill.id, 0));
    }
    const query = "INSERT INTO rival_skills (rival_id, skill_id, ranks) VALUES ($1, $2, $3);";
    for (const skill of skills) {
        await pool.query(query, [id, skill.id, 0]);
    }
    return skills;
};

export const getRivalSkills = async (id: number): Promise<ActorSkill[]> => {
    const query = "SELECT * FROM rival_skills WHERE rival_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const skills = [] as ActorSkill[];
    for (const skill_row of ids.rows) {
        const skill = await getActorSkill(skill_row['skill_id'], skill_row.ranks);
        skills.push(skill);
    }
    return skills;
};

export const getActorSkill = async (id: number, ranks: number): Promise<ActorSkill> => {
    const query = "SELECT * FROM skill WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    let skill = result.rows[0] as ActorSkill;
    skill.ranks = ranks;
    return skill;
};

export const getRivalWeapons = async (id: number): Promise<ActorWeapon[]> => {
    const query = "SELECT * FROM rival_weapons WHERE rival_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const weapons = [] as ActorWeapon[];
    for (const weapon_row of ids.rows) {
        let weapon = await retrieveWeapon(Number(weapon_row['weapon_id']));
        weapons.push(weapon as ActorWeapon);
    }
    return weapons;
};

export const getRivalArmors = async (id: number): Promise<ActorArmor[]> => {
    const query = "SELECT * FROM rival_armors WHERE rival_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const armors = [] as ActorArmor[];
    for (const armor_row of ids.rows) {
        let armor = await retrieveArmor(Number(armor_row['armor_id']));
        armors.push(armor as ActorArmor);
    }
    return armors;
};