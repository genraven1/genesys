import axios from "axios";
import Talent from "../models/Talent";
import { get, post } from "./rest";

export default class TalentService {

    static async getTalents(): Promise<Talent[]> {
        return await (await axios.get('/talents')).data.Items
    }

    static createTalent(talent: Talent): Promise<Talent> {
        return post('talents', talent);
    }
}