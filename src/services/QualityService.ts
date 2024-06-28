import {ModificationPath, RootPath} from "./RootPath";
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
        return await fetch(RootPath.Qualities, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateQuality(quality: Quality): Promise<Quality> {
        return await fetch(RootPath.Qualities + `${quality.quality_id}`, {method: 'PUT', body: JSON.stringify(quality)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async addQualityModification(id: string, modifier: Modifier) {
        return await fetch(ModificationPath.ModificationQuality + `${id}`, {
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