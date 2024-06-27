import axios from 'axios';
import {RootPath} from './RootPath';
import Skill from '../models/actor/Skill';

export default class SkillService {
    
    static async createSkill(name: string): Promise<Skill> {
        return await (await axios.post(RootPath.Skills + name)).data;
    }

    static async getSkill(name: string): Promise<Skill> {
        return await (await axios.get(RootPath.Skills + name)).data;
    }

    static async getSkills(): Promise<Skill[]> {
        return await (await axios.get(RootPath.Skills)).data;
    }

    static async updateSkill(name: string, skill: Skill): Promise<Skill> {
        return await (await axios.put(RootPath.Skills + name, skill)).data;
    }
}