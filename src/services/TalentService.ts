import axios from "axios";
import Talent from "../models/Talent";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get('/talents')).data;
    }

    static async getTalent(name: string): Promise<Talent> {
        return await (await axios.get('/talents/' + name)).data;
    }

    static async createTalent(name: String): Promise<Talent> {
        return await axios.post('/talents/' + name);
    }

    static async updateTalent(name: String, talent: Talent): Promise<Talent> {
        return await axios.put('/talents/' + name, talent);
    }
}