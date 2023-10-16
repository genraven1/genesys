import Setting from "../models/Setting.ts";
import {pool} from "../config/Database.ts";
import {getCurrentSettingId, getSetting} from "./SettingHelper.ts";
import {ActorSkill, Skill} from "../models/Skill.ts";
import {GroupSkill} from "../models/Minion.ts";
import NonPlayerActor from "../models/NonPlayerActor.ts";
import {getCurrentSettingSkills} from "./SkillHelper.ts";

export const getAllMinions = async (): Promise<NonPlayerActor[]> => {
    const query = "SELECT * from minion;";
    const results = await pool.query(query);
    const minions = [] as NonPlayerActor[];
    for (const result of results.rows) {
        minions.push(result);
    }
    return minions;
};

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

export const getMinionSkills = async (id: number): Promise<ActorSkill[]> => {
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