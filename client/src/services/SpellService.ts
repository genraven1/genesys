import axios from "axios";
import {Path} from "./Path";
import Spell from "../models/spell/Spell";

export default class SpellService {

    static async getSpells(): Promise<Spell[]> {
        return await (await axios.get(Path.Spell)).data;
    }

    static async getSpell(name: string): Promise<Spell> {
        return await (await axios.get(Path.Spell + name)).data;
    }

    static async createSpell(name: string): Promise<Spell> {
        return await (await axios.post(Path.Spell + name)).data;
    }

    static async updateSpell(name: string, talent: Spell): Promise<Spell> {
        return await (await axios.put(Path.Spell + name, talent)).data;
    }
}