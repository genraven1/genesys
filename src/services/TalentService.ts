import axios from "axios";
import Talent from "../models/Talent";
import rest from "./rest";

export default class TalentService {

    static getTalents(): Promise<Talent[]> {
        return rest.get('/talents');
    }

    static createTalent(): Promise<Talent> {
        return rest.post('/talents', {
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