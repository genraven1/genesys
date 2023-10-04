import axios from 'axios';
import {Path} from './Path';
import Skill from '../models/actor/Skill';

export default class SkillService {
    
    static async createSkill(name: string): Promise<Skill> {
        return await (await axios.post(Path.Skills + name)).data;
    }

    static async getSkill(id: number): Promise<Skill> {
        return await (await axios.get(Path.Skills + id)).data;
    }

    static async getSkills(): Promise<Skill[]> {
        return await (await axios.get(Path.Skills)).data;
    }

    static async updateSkill(id: number, skill: Skill): Promise<Skill> {
        return await (await axios.put(Path.Skills + id, skill)).data;
    }
}