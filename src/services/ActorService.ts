import axios from "axios";
import Player, {PlayerSkill} from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {ActorPath} from "./Path";
import Rival from "../models/actor/npc/Rival";
import Actor, {ActorTalent, ActorSkill} from "../models/actor/Actor";
import Minion from "../models/actor/npc/Minion";

export default class ActorService {

    static async getActors(): Promise<Actor[]> {
        return await (await axios.get(ActorPath.Actor)).data;
    }

    static async createPlayer(name: string): Promise<Player> {
        return await axios.post( ActorPath.Player + name);
    }

    static async getPlayer(name: string): Promise<Player> {
        return await (await axios.get(ActorPath.Player + name)).data;
    }

    static async getPlayers(): Promise<Player[]> {
        return await (await axios.get(ActorPath.Player)).data;
    }

    static async updatePlayer(name: string, player: Player): Promise<Player> {
        return await axios.put(ActorPath.Player + name, player);
    }

    static async updatePlayerSkill(name: string, skill: PlayerSkill): Promise<Player> {
        return await axios.put(ActorPath.Player + name + '/skill', skill);
    }

    static async addPlayerTalent(name: string, talent: ActorTalent): Promise<Player> {
        return await axios.put(ActorPath.Player + name + '/talent', talent);
    }

    static async createNemesis(name: string): Promise<Nemesis> {
        return await axios.post( ActorPath.Nemesis + name);
    }

    static async getNemesis(name: string): Promise<Nemesis> {
        return await (await axios.get(ActorPath.Nemesis + name)).data;
    }

    static async getNemeses(): Promise<Nemesis[]> {
        return await (await axios.get(ActorPath.Nemesis)).data;
    }

    static async updateNemesis(name: string, nemesis: Nemesis): Promise<Nemesis> {
        return await axios.put(ActorPath.Nemesis + name, nemesis);
    }

    static async updateNemesisSkill(name: string, skill: ActorSkill): Promise<Nemesis> {
        return await axios.put(ActorPath.Nemesis + name + '/skills', skill);
    }
    
    static async addNemesisTalent(name: string, talent: ActorTalent): Promise<Nemesis> {
        return await axios.put(ActorPath.Nemesis + name + '/talents', talent);
    }

    static async createRival(name: string): Promise<Rival> {
        return await axios.post( ActorPath.Rival + name);
    }

    static async getRival(name: string): Promise<Rival> {
        return await (await axios.get(ActorPath.Rival + name)).data;
    }

    static async getRivals(): Promise<Rival[]> {
        return await (await axios.get(ActorPath.Rival)).data;
    }

    static async updateRival(name: string, rival: Rival): Promise<Rival> {
        return await axios.put(ActorPath.Rival + name, rival);
    }

    static async updateRivalSkill(name: string, skill: ActorSkill): Promise<Rival> {
        return await axios.put(ActorPath.Rival + name + '/skills', skill);
    }

    static async addRivalTalent(name: string, talent: ActorTalent): Promise<Rival> {
        return await axios.put(ActorPath.Rival + name + '/talents', talent);
    }

    static async createMinion(name: string): Promise<Minion> {
        return await axios.post( ActorPath.Minion + name);
    }

    static async getMinion(name: string): Promise<Minion> {
        return await (await axios.get(ActorPath.Minion + name)).data;
    }

    static async getMinions(): Promise<Minion[]> {
        return await (await axios.get(ActorPath.Minion)).data;
    }

    static async updateMinion(name: string, minion: Minion): Promise<Minion> {
        return await axios.put(ActorPath.Minion + name, minion);
    }

    static async updateMinionSkill(name: string, skill: ActorSkill): Promise<Minion> {
        return await axios.put(ActorPath.Minion + name + '/skills', skill);
    }

    static async addMinionTalent(name: string, talent: ActorTalent): Promise<Minion> {
        return await axios.put(ActorPath.Minion + name + '/talents', talent);
    }
}