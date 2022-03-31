import axios from "axios";
import Minion from "../models/Minion";
import { post } from "./rest";

export default class ActorService {

    static async getMinions(): Promise<Minion[]> {
        return await (await axios.get('/actors/npc/minions')).data.Items
    }

    static async getMinion(id: string): Promise<Minion> {
        return post('/actors/npc/minions/' + id);
    }

    static async createMinion(minion: Minion): Promise<Minion> {
        return await axios.post('/actors/npc/minions', minion);
    }
}