import axios from "axios";
import {Path} from "./Path";
import Injury from "../models/Injury";

export async function GetAllInjuries(): Promise<Injury[]> {
    const injuries = await fetch("/api/injuries");
    return injuries.json()
}

export default class InjuryService {
    static async createInjury(name: string): Promise<Injury> {
        return await (await axios.post(Path.Injury + name)).data;
    }

    static async getInjury(name: string): Promise<Injury> {
        return await (await axios.get(Path.Injury + name)).data;
    }

    static async updateInjury(name: string, injury: Injury): Promise<Injury> {
        return await (await axios.put(Path.Injury + name, injury)).data;
    }

    static async getInjuries(): Promise<Injury[]> {
        return await (await axios.get(Path.Injury)).data;
    }
}