import {RootPath} from './Path';
import Skill from '../models/actor/Skill';

export default class SkillService {

    static async createSkill(skill: Skill): Promise<Skill> {
        return await fetch(RootPath.Skills, {
            method: "POST",
            body: JSON.stringify(skill),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getSkill(name: string): Promise<Skill> {
        return await fetch(RootPath.Skills + `${name}`)
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
        return await fetch(RootPath.Skills + `${skill.name}`, {
            method: "PUT",
            body: JSON.stringify(skill),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}