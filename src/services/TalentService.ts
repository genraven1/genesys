import axios from "axios";
import Talent from "../models/Talent";
import {Path} from "./Path";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get(Path.Talent)).data;
    }

    static async getTalentIds(): Promise<number[]> {
        return await (await axios.get(Path.Talent + '/ids')).data;
    }

    static async getTalent(id: number): Promise<Talent> {
        return await (await axios.get(Path.Talent + id)).data;
    }

    static async createTalent(name: string): Promise<Talent> {
        return await (await axios.post(Path.Talent + name)).data
    }

    static async updateTalent(id: number, talent: Talent): Promise<Talent> {
        return await axios.put(Path.Talent + id, talent);
    }
}