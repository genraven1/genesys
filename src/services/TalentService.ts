import Talent from "../models/Talent";
import { get, post } from "./rest";

export default class TalentService {

    static getTalents(): Promise<Talent[]> {
        return get('/talents');
    }

    static createTalent(talent: Talent): Promise<Talent> {
        return post('/talents', talent);
    }
}