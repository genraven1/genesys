import axios from "axios";
import Talent from "../models/Talent";
import {Path} from "./Path";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get(Path.Talent)).data;
    }

    static async getTalent(name: string): Promise<Talent> {
        return await (await axios.get(Path.Talent + name)).data;
    }

    static async createTalent(name: string): Promise<Talent> {
        return await (await axios.post(Path.Talent + name)).data;
    }

    static async updateTalent(name: string, talent: Talent): Promise<Talent> {
        return await (await axios.put(Path.Talent + name, talent)).data;
    }
}