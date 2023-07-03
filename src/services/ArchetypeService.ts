import axios from "axios";
import {Path} from "./Path";
import Archetype from "../models/actor/player/Archetype";
import Ability from "../models/Ability";

export default class ArchetypeService {

    static async getArchetypes(): Promise<Archetype[]> {
        return await (await axios.get(Path.Archetype)).data;
    }

    static async getArchetypeNames(): Promise<string[]> {
        return await (await axios.get(Path.Archetype + '/names')).data;
    }

    static async getArchetype(name: string): Promise<Archetype> {
        return await (await axios.get(Path.Archetype + name)).data;
    }

    static async createArchetype(name: string): Promise<Archetype> {
        return await (await axios.post(Path.Archetype + name)).data
    }

    static async updateArchetype(name: string, archetype: Archetype): Promise<Archetype> {
        return await (await axios.put(Path.Archetype + name, archetype)).data;
    }

    static async createArchetypeAbility(name: string, ability: Ability): Promise<Archetype> {
        return await (await axios.post(Path.Archetype + name + '/ability', ability)).data
    }
}