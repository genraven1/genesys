import axios from "axios";
import Player, {PlayerSkill} from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import {ActorPath, CampaignPath, RootPath} from "../../client/src/services/RootPath";
import Rival from "../models/actor/npc/Rival";
import Actor from "../models/actor/Actor";
import Minion from "../models/actor/npc/Minion";
import NonPlayerActor from "../models/actor/npc/NonPlayerActor";
import Career from "../models/actor/player/Career";
import Archetype from "../models/actor/player/Archetype";

export default class ActorService {

    static async getActors(): Promise<Actor[]> {
        return await (await axios.get(ActorPath.Actor)).data;
    }

    static async getNonPlayerCharacters(): Promise<NonPlayerActor[]> {
        return await (await axios.get(ActorPath.Npc)).data;
    }

    static async createPlayer(id: string, playerName: string): Promise<Player> {
        return await fetch(CampaignPath.Campaign + `${id}` + ActorPath.Player + `${playerName}`, {
            method: "POST"
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getPlayer(id: string): Promise<Player> {
        return await fetch(ActorPath.Player + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getPlayers(campaignName: string): Promise<Player[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Player)
            .then((res) => {
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
            })
    }

    static async updatePlayer(player: Player): Promise<Player> {
        return await fetch(ActorPath.Player + `${player.id}`, {
            method: "PUT",
            body: JSON.stringify(player),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updatePlayerCareer(playerId: string, career: Career): Promise<Player> {
        return await fetch(ActorPath.Player + `${playerId}` + RootPath.Career, {
            method: "PATCH",
            body: JSON.stringify(career),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updatePlayerCareerSkills(playerId: string, skills: PlayerSkill[]): Promise<Player> {
        return await fetch(ActorPath.Player + `${playerId}` + RootPath.Career + 'skills/', {
            method: "PATCH",
            body: JSON.stringify(skills),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async updatePlayerArchetype(playerId: string, archetype: Archetype): Promise<Player> {
        return await fetch(ActorPath.Player + `${playerId}` + RootPath.Archetype, {
            method: "PATCH",
            body: JSON.stringify(archetype),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createNemesis(name: string): Promise<Nemesis> {
        return await (await axios.post(ActorPath.Nemesis + name)).data;
    }

    static async getNemesis(name: string): Promise<Nemesis> {
        return await (await axios.get(ActorPath.Nemesis + name)).data;
    }

    static async getNemeses(): Promise<Nemesis[]> {
        return await (await axios.get(ActorPath.Nemesis)).data;
    }

    static async updateNemesis(name: string, nemesis: Nemesis): Promise<Nemesis> {
        return await (await axios.put(ActorPath.Nemesis + name, nemesis)).data;
    }

    static async getRival(id: string): Promise<Rival> {
        return await fetch(ActorPath.Rival + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createRival(id: string, rivalName: string): Promise<Rival> {
        return await fetch(CampaignPath.Campaign + `${id}` + ActorPath.Rival + `${rivalName}`, {
            method: "POST"
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getRivals(campaignName: string): Promise<Rival[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Rival)
            .then((res) => {
                switch (res.status) {
                    case 204:
                        return []
                    case 200:
                        return res.json()
                    default:
                        throw new Error(res.statusText)
                }
            })
    }

    static async updateRival(rival: Rival): Promise<Rival> {
        return await fetch(ActorPath.Rival + `${rival.id}`, {
            method: "PUT",
            body: JSON.stringify(rival),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async createMinion(name: string): Promise<Minion> {
        return await (await axios.post(ActorPath.Minion + name)).data;
    }

    static async getMinion(name: string): Promise<Minion> {
        return await (await axios.get(ActorPath.Minion + name)).data;
    }

    static async getMinions(): Promise<Minion[]> {
        return await (await axios.get(ActorPath.Minion)).data;
    }

    static async updateMinion(name: string, minion: Minion): Promise<Minion> {
        return await (await axios.put(ActorPath.Minion + name, minion)).data;
    }
}