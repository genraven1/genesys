import {RootPath} from "./RootPath";
import Spell from "../models/spell/Spell";

export default class SpellService {

    static async getSpells(): Promise<Spell[]> {
        return await fetch(RootPath.Spell)
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

    static async getSpell(name: string): Promise<Spell> {
        return await fetch(RootPath.Spell + `${name}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createSpell(name: string): Promise<Spell> {
        return await fetch(RootPath.Spell + `${name}`, {method: "POST"})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updateSpell(spell: Spell): Promise<Spell> {
        return await fetch(RootPath.Spell + `${spell.name}`, {method: 'PUT', body: JSON.stringify(spell)})
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }
}