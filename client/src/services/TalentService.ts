import Talent from "../models/Talent";
import {RootPath} from "./Path";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await fetch(RootPath.Talent)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getTalent(name: string): Promise<Talent> {
        return await fetch(RootPath.Talent + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createTalent(name: string): Promise<Talent> {
        return await fetch(RootPath.Talent + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateTalent(talent: Talent): Promise<Talent> {
        return await fetch(RootPath.Talent + `${talent.name}`, {
            method: "PUT",
            body: JSON.stringify(talent),
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