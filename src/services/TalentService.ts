import Talent from "../models/Talent";
import { get } from "./rest";

export default class TalentService {

    static getTalents(): Promise<Talent[]> {
        return get('/talents');
    }
}