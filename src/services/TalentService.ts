import axios from "axios";
import Talent from "../models/Talent";
import httpCommon from "./rest";

export default class TalentService {

    static getTalents(): Promise<Talent> {
        return httpCommon.get('/talents');
    }

    static createTalent(): Promise<Talent> {
        return httpCommon.post('/talents', {
            name: 'Grit',
            ranked: true
        });
    }

    static async create(): Promise<void> {
        try {
            const response = await axios.post('http://localhost:8080/talents', {
                name: 'Grit',
                ranked: true
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
}