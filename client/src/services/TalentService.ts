import Talent from "../models/Talent";
import {ModificationPath, RootPath} from "./Path";
import Modifier from "../models/common/Modifier";

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

    static async createTalent(talent: Talent): Promise<Talent> {
        return await fetch(RootPath.Talent, {
            method: "POST",
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

    static async addTalentModification(name: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationTalent + `${name}`, {
            method: 'POST',
            body: JSON.stringify(modifier)
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}