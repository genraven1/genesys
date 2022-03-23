import Minion from "../models/Minion";
import { get, post } from "./rest";

export default class ActorService {

    static getMinions(): Promise<Minion[]> {
        return get('/actors/npc/minions');
    }

    static getMinion(id: string): Promise<Minion> {
        return post('/actors/npc/minions/' + id);
    }

    static createMinion(minion: Minion): Promise<Minion> {
        return post('/actors/npc/minions', minion);
    }
}