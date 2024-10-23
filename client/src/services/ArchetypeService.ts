import {RootPath} from "./RootPath";
import Archetype from "../models/actor/player/Archetype";

export default class ArchetypeService {
    static async getArchetypes(): Promise<Archetype[]> {
        return await fetch(RootPath.Archetype)
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

    static async getArchetype(id: string): Promise<Archetype> {
        return await fetch(RootPath.Archetype + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createArchetype(name: string): Promise<Archetype> {
        return await fetch(RootPath.Archetype + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateArchetype(archetype: Archetype): Promise<Archetype> {
        return await fetch(RootPath.Archetype + `${archetype.id}`, {
            method: "PUT",
            body: JSON.stringify(archetype),
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