import {RootPath} from './RootPath';
import Skill from '../models/actor/Skill';

export default class SkillService {
    
    static async createSkill(name: string): Promise<Skill> {
        return await fetch(RootPath.Skills, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getSkill(id: string): Promise<Skill> {
        return await fetch(RootPath.Skills + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getSkills(): Promise<Skill[]> {
        return await fetch(RootPath.Skills)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateSkill(skill: Skill): Promise<Skill> {
        return await fetch(RootPath.Skills + `${skill.skill_id}`, {method: 'PUT', body: JSON.stringify(skill)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}