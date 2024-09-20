import {ModificationPath, RootPath} from "./Path";
import Quality from "../models/Quality";
import Modifier from "../models/common/Modifier";

export default class QualityService {

    static async getQualities(): Promise<Quality[]> {
        return await fetch(RootPath.Qualities)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getQuality(name: string): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createQuality(name: string): Promise<Quality> {
        return await fetch(RootPath.Qualities, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateQuality(quality: Quality): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${quality.name}`, {method: 'PUT', body: JSON.stringify(quality)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addQualityModification(name: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationQuality + `${name}`, {
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