import axios from "axios";
import Player from "../models/actor/Player";

export default class ActorService {

    static async createPlayer(name: String): Promise<Player> {
        return await axios.post('/actors/players/' + name);
    }

    static async getPlayer(name: string): Promise<Player> {
        console.log(await (await axios.get('/actors/players/' + name)).data)
        return await (await axios.get('/actors/players/' + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get('/actors/players/')).data;
    }

    static async updatePlayer(name: String, player: Player): Promise<Player> {
        return await axios.put('/actors/players/' + name, player);
    }
}