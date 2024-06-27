import axios from "axios";
import Talent from "../models/Talent";
import {RootPath} from "./RootPath";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get(RootPath.Talent)).data;
    }

    static async getTalent(name: string): Promise<Talent> {
        return await (await axios.get(RootPath.Talent + name)).data;
    }

    static async createTalent(name: string): Promise<Talent> {
        return await (await axios.post(RootPath.Talent + name)).data;
    }

    static async updateTalent(name: string, talent: Talent): Promise<Talent> {
        return await (await axios.put(RootPath.Talent + name, talent)).data;
    }
}