import {RootPath} from "./Path";
import Spell from "../models/spell/Spell";

export default class SpellService {

    static async getSpells(): Promise<Spell[]> {
        return await fetch(RootPath.Spell)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
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
        return await fetch(RootPath.Spell, {method: "POST", body: JSON.stringify({name: name})})
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