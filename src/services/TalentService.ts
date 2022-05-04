import axios from "axios";
import Talent from "../models/Talent";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get('/talents')).data.Items;
    }

    static async createTalent(talent: Talent): Promise<Talent> {
        return await axios.post('/talents', talent);
    }
}