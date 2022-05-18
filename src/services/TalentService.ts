import { ApiResponse, RequestParams } from "@elastic/elasticsearch";
import axios from "axios";
import Talent from "../models/Talent";
import { client } from "./rest";

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

    static async createNewTalent(name: string): Promise<any> {
        var doc: RequestParams.Index = {
            index: 'talents',
            id: name,
            body: {
                'name': name
            }
        }
        await client.index(doc).then((result: ApiResponse) => {
            return result.body
        })
    }
}