import axios from "axios";
import {Path} from "./Path";
import Archetype from "../models/actor/player/Archetype";

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

    static async updateArchetype(name: string, talent: Archetype): Promise<Archetype> {
        return await axios.put(Path.Archetype + name, talent);
    }
}