import axios from "axios";
import {RootPath} from "./RootPath";
import Spell from "../models/spell/Spell";

export default class SpellService {

    static async getSpells(): Promise<Spell[]> {
        return await (await axios.get(RootPath.Spell)).data;
    }

    static async getSpell(name: string): Promise<Spell> {
        return await (await axios.get(RootPath.Spell + name)).data;
    }

    static async createSpell(name: string): Promise<Spell> {
        return await (await axios.post(RootPath.Spell + name)).data;
    }

    static async updateSpell(name: string, spell: Spell): Promise<Spell> {
        return await (await axios.put(RootPath.Spell + name, spell)).data;
    }
}