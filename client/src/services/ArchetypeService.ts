import {RootPath} from "./Path";
import Archetype from "../models/actor/player/Archetype";

export default class ArchetypeService {
    static async getArchetypes(): Promise<Archetype[]> {
        return await fetch(RootPath.Archetype)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getArchetype(name: string): Promise<Archetype> {
        return await fetch(RootPath.Archetype + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createArchetype(name: string): Promise<Archetype> {
        return await fetch(RootPath.Archetype, {method: "POST", body: JSON.stringify({name: name})})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateArchetype(archetype: Archetype): Promise<Archetype> {
        return await fetch(RootPath.Archetype + `${archetype.name}`, {method: 'PUT', body: JSON.stringify(archetype)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}