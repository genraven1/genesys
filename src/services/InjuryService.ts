import {ModificationPath, RootPath} from "./RootPath";
import Injury from "../models/Injury";
import Modifier from "../models/common/Modifier";

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return await fetch(RootPath.Injury, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getInjury(id: string): Promise<Injury> {
        return await fetch(RootPath.Injury + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateInjury(injury: Injury): Promise<Injury> {
        return await fetch(RootPath.Injury + `${injury.injury_id}`, {method: 'PUT', body: JSON.stringify(injury)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getAllInjuries(): Promise<Injury[]> {
        return await fetch(RootPath.Injury)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async AddInjuryModification(id: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationInjury + `${id}`, {method: 'POST', body: JSON.stringify(modifier)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}