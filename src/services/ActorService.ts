import axios from "axios";
import Minion from "../models/actor/Minion";
import Player from "../models/actor/Player";
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

    static async createPlayer(name: String): Promise<Player> {
        return await axios.post('/actors/players/' + name);
    }

    static async getPlayer(name: string): Promise<Player> {
        return await (await axios.get('/actors/players/' + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get('/actors/players/')).data;
    }

    static async updatePlayer(name: String, player: Player): Promise<Player> {
        return await axios.put('/actors/players/' + name, player);
    }
}