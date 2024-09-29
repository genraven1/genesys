import {RootPath} from "./Path";
import Quality from "../models/Quality";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return await fetch(RootPath.Qualities)
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

    static async getQuality(id: string): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createQuality(name: string): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateQuality(quality: Quality): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${quality.id}`, {
            method: "PUT",
            body: JSON.stringify(quality),
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