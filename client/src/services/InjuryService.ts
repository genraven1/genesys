import {RootPath} from "./RootPath";
import Injury from "../models/Injury";

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return await fetch(RootPath.Injury + `${name}`, {method: "POST"})
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
        return await fetch(RootPath.Injury + `${injury.id}`, {
            method: "PUT",
            body: JSON.stringify(injury),
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

    static async getAllInjuries(): Promise<Injury[]> {
        return await fetch(RootPath.Injury)
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
}