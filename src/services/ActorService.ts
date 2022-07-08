import axios from "axios";
import Player from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {Path} from "./Path";
import {ActorSkill, ActorTalent} from "../models/actor/Actor";

export default class ActorService {

    static async createPlayer(name: string): Promise<Player> {
        return await axios.post( Path.Player + name);
    }

    static async getPlayer(name: string): Promise<Player> {
        return await (await axios.get(Path.Player + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get(Path.Player)).data;
    }

    static async updatePlayer(name: string, player: Player): Promise<Player> {
        return await axios.put(Path.Player + name, player);
    }

    static async createNemesis(name: string): Promise<Nemesis> {
        return await axios.post( Path.Nemesis + name);
    }

    static async getNemesis(name: string): Promise<Nemesis> {
        return await (await axios.get(Path.Nemesis + name)).data;
    }

    static async getNemeses(): Promise<Nemesis[]> {
        return await (await axios.get(Path.Nemesis)).data;
    }

    static async updateNemesis(name: string, nemesis: Nemesis): Promise<Nemesis> {
        return await axios.put(Path.Nemesis + name, nemesis);
    }

    static async updateNemesisSkill(name: string, skill: ActorSkill): Promise<Nemesis> {
        return await axios.put(Path.Nemesis + name + '/skill', skill);
    }

    static async addNemesisTalent(name: string, talent: ActorTalent): Promise<Nemesis> {
        return await axios.put(Path.Nemesis + name + '/talent', talent);
    }
}