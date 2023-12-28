import Setting from '../../client/src/models/Setting.ts';
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSetting} from "./SettingHelper.ts";
import {getCurrentSettingSkills} from "./SkillHelper.ts";
import {retrieveWeapon} from "./WeaponHelper.ts";
import {retrieveArmor} from "./ArmorHelper.ts";
import Minion, { GroupSkill } from '../../client/src/models/actor/npc/Minion.ts';
import NonPlayerActor from '../../client/src/models/actor/npc/NonPlayerActor.ts';
import Skill from '../../client/src/models/actor/Skill.ts';
import { ActorWeapon } from '../../client/src/models/equipment/Weapon.ts';
import { ActorArmor } from '../../client/src/models/equipment/Armor.ts';
import {createDefaultCharacteristics, createDefaultRatings, createDefaultStats} from "./ActorHelper.ts";

export const createMinionActor = async (name: string): Promise<Minion> => {
    const countQuery = "SELECT COUNT(*) FROM minion;";
    const count = await pool.query(countQuery);
    const insertQuery = "INSERT INTO minion (name, id, type) VALUES ($1, $2, $3) RETURNING *;";
    const minion_id = Number(count.rows[0]['count']) + 1;
    const values = [name, minion_id, 'Minion'];
    const results = await pool.query(insertQuery, values);
    const minion = results.rows[0] as Minion;
    createDefaultCharacteristics(minion);
    createDefaultStats(minion);
    createDefaultRatings(minion);
    minion.settings = await createMinionSettings(minion_id);
    minion.skills = await createMinionSkills(minion_id);
    minion.abilities = [];
    minion.talents = [];
    minion.weapons = [];
    minion.armor = [];
    minion.gear = [];
    return minion;
};

export const getAllMinions = async (): Promise<NonPlayerActor[]> => {
    const query = "SELECT * from minion;";
    const results = await pool.query(query);
    const minions = [] as NonPlayerActor[];
    for (const result of results.rows) {
        minions.push(result);
    }
    return minions;
};

export const retrieveMinion = async (id: number): Promise<Minion> => {
    const query = "SELECT * from minion WHERE id = $1;";
    const values = [id];
    const results = await pool.query(query, values);
    const minion = results.rows[0] as Minion;
    minion.settings = await getMinionSettings(id) as Setting[];
    minion.skills = await getMinionSkills(id) as GroupSkill[];
    minion.abilities = [];
    minion.talents = [];
    minion.weapons = await getMinionWeapons(id);
    minion.armor = await getMinionArmors(id);
    minion.gear = [];
    return minion;
}

export const createMinionSettings = async (id: number): Promise<Setting[]> => {
    const settingQuery = "INSERT INTO minion_settings (minion_id, setting_id) VALUES ($1, $2);";
    const setting_id = await getCurrentSettingId();
    const settingValues = [id, Number(setting_id)];
    const settingResults = await pool.query(settingQuery, settingValues);
    return settingResults.rows as Setting[];
};

export const getMinionSettings = async (id: number): Promise<Setting[]> => {
    const query = "SELECT setting_id FROM minion_settings WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const settings = [] as Setting[];
    for (const setting_id of ids.rows) {
        const setting = await getSetting(Number(setting_id['setting_id']));
        settings.push(setting);
    }
    return settings;
};

export const createMinionSkills = async (id: number): Promise<GroupSkill[]> => {
    const skills = await getCurrentSettingSkills() as Skill[];
    const groupSkills = [] as GroupSkill[];
    for (const skill of skills) {
        groupSkills.push(await getGroupSkill(skill.id, false));
    }
    const query = "INSERT INTO minion_skills (minion_id, skill_id, group_skill) VALUES ($1, $2, $3);";
    for (const skill of groupSkills) {
        await pool.query(query, [id, skill.id, false]);
    }
    return groupSkills;
};

export const getMinionSkills = async (id: number): Promise<GroupSkill[]> => {
    const query = "SELECT * FROM minion_skills WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const skills = [] as GroupSkill[];
    for (const skill_row of ids.rows) {
        const skill = await getGroupSkill(skill_row['skill_id'], skill_row.group_skill);
        skills.push(skill);
    }
    return skills;
};

export const getGroupSkill = async (id: number, group: boolean): Promise<GroupSkill> => {
    const query = "SELECT * FROM skill WHERE id = $1;";
    const values = [id];
    const result = await pool.query(query, values);
    let skill = result.rows[0] as GroupSkill;
    skill.group_skill = group;
    return skill;
};

export const getMinionWeapons = async (id: number): Promise<ActorWeapon[]> => {
    const query = "SELECT * FROM minion_weapons WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const weapons = [] as ActorWeapon[];
    for (const weapon_row of ids.rows) {
        let weapon = await retrieveWeapon(Number(weapon_row['weapon_id']));
        weapons.push(weapon as ActorWeapon);
    }
    return weapons;
};

export const getMinionArmors = async (id: number): Promise<ActorArmor[]> => {
    const query = "SELECT * FROM minion_armors WHERE minion_id = $1;";
    const values = [id];
    const ids = await pool.query(query, values);
    const armors = [] as ActorArmor[];
    for (const armor_row of ids.rows) {
        let armor = await retrieveArmor(Number(armor_row['armor_id']));
        armors.push(armor as ActorArmor);
    }
    return armors;
};