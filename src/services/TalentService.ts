import Talent from "../models/Talent";
import {ModificationPath, RootPath} from "./RootPath";
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
        return await fetch(RootPath.Talent, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateTalent(talent: Talent): Promise<Talent> {
        return await fetch(RootPath.Talent + `${talent.talent_id}`, {method: 'PUT', body: JSON.stringify(talent)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addTalentModification(id: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationTalent + `${id}`, {
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