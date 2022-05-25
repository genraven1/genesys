import axios from "axios";
import Player from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";

export enum ActorPath {
    Player = '/actors/players/',
    Nemesis = '/actors/nemesis/'
}

export default class ActorService {

    static async createPlayer(name: String): Promise<Player> {
        return await axios.post( ActorPath.Player + name);
    }

    static async getPlayer(name: string): Promise<Player> {
        return await (await axios.get(ActorPath.Player + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get(ActorPath.Player)).data;
    }

    static async updatePlayer(name: String, player: Player): Promise<Player> {
        return await axios.put(ActorPath.Player + name, player);
    }

    static async createNemesis(name: String): Promise<Nemesis> {
        return await axios.post( ActorPath.Nemesis + name);
    }

    static async getNemesis(name: string): Promise<Nemesis> {
        return await (await axios.get(ActorPath.Nemesis + name)).data;
    }

    static async getNemesiss(): Promise<Nemesis[]> {
        return await (await axios.get(ActorPath.Nemesis)).data;
    }

    static async updateNemesis(name: String, nemesis: Nemesis): Promise<Nemesis> {
        return await axios.put(ActorPath.Nemesis + name, nemesis);
    }
}