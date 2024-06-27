import axios from "axios";
import {RootPath} from "./RootPath";
import Archetype from "../models/actor/player/Archetype";

export default class ArchetypeService {
    static async createArchetype(name: string): Promise<Archetype> {
        return await (await axios.post(RootPath.Archetype + name)).data;
    }

    static async getArchetype(name: string): Promise<Archetype> {
        return await (await axios.get(RootPath.Archetype + name)).data;
    }

    static async updateArchetype(name: string, archetype: Archetype): Promise<Archetype> {
        return await (await axios.put(RootPath.Archetype + name, archetype)).data;
    }

    static async getArchetypes(): Promise<Archetype[]> {
        return await (await axios.get(RootPath.Archetype)).data;
    }
}