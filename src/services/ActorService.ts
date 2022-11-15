import axios from "axios";
import Player, {PlayerSkill} from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {Path} from "./Path";
import Rival from "../models/actor/npc/Rival";
import {ActorTalent} from "../models/actor/Actor";
import {NonPlayerCharacterSkill} from "../models/actor/npc/NonPlayerCharacter";

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

    static async updatePlayerSkill(name: string, skill: PlayerSkill): Promise<Player> {
        return await axios.put(Path.Player + name + '/skill', skill);
    }

    static async addPlayerTalent(name: string, talent: ActorTalent): Promise<Player> {
        return await axios.put(Path.Player + name + '/talent', talent);
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

    static async updateNemesisSkill(name: string, skill: NonPlayerCharacterSkill): Promise<Nemesis> {
        return await axios.put(Path.Nemesis + name + '/skill', skill);
    }
    
    static async addNemesisTalent(name: string, talent: ActorTalent): Promise<Nemesis> {
        return await axios.put(Path.Nemesis + name + '/talent', talent);
    }

    static async createRival(name: string): Promise<Rival> {
        return await axios.post( Path.Rival + name);
    }

    static async getRival(name: string): Promise<Rival> {
        return await (await axios.get(Path.Rival + name)).data;
    }

    static async getRivals(): Promise<Rival[]> {
        return await (await axios.get(Path.Rival)).data;
    }

    static async updateRival(name: string, rival: Rival): Promise<Rival> {
        return await axios.put(Path.Rival + name, rival);
    }
}