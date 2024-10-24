import Talent from "../models/Talent";
import {RootPath} from "./RootPath";


export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await fetch(RootPath.Talent)
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

    static async getTalent(id: string): Promise<Talent> {
        return await fetch(RootPath.Talent + `${id}`)
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
        return await fetch(RootPath.Talent + `${talent.id}`, {
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