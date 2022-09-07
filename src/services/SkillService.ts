import axios from 'axios';
import {Path} from './Path';
import Skill from '../models/actor/Skill';

export default class SkillService {
    
    static async createSkill(name: string) {
        return await axios.post(Path.Skills + name);
    }

    static async getSkill(name: string): Promise<Skill> {
        return await (await axios.get(Path.Skills + name)).data;
    }

    static async getSkills(): Promise<Skill[]> {
        return await (await axios.get(Path.Skills)).data;
    }

    static async updateSkill(name: string, skill: Skill): Promise<Skill> {
        return await axios.put(Path.Skills + name, skill);
    }
}