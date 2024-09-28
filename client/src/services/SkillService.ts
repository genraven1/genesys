import {RootPath} from './Path';
import Skill from '../models/actor/Skill';

export default class SkillService {

    static async createSkill(name: string): Promise<Skill> {
        return await fetch(RootPath.Skills + `${name}`, {method: "POST"})
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
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
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