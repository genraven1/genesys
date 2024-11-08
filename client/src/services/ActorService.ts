import axios from "axios";
import Player, {PlayerSkill} from "../models/actor/player/Player";
import Nemesis from "../models/actor/npc/Nemesis";
import Rival from "../models/actor/npc/Rival";
import Actor, {ActorSkill} from "../models/actor/Actor";
import Minion, {GroupSkill} from "../models/actor/npc/Minion";
import NonPlayerActor from "../models/actor/npc/NonPlayerActor";
import Career from "../models/actor/player/Career";
import Archetype from "../models/actor/player/Archetype";
import {ActorPath, CampaignPath, RootPath} from "./RootPath";

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

    static async createNemesis(id: string, nemesisName: string): Promise<Nemesis> {
        return await fetch(CampaignPath.Campaign + `${id}` + ActorPath.Nemesis + `${nemesisName}`, {
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

    static async getNemesis(id: string): Promise<Nemesis> {
        return await fetch(ActorPath.Nemesis + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getNemeses(campaignName: string): Promise<Nemesis[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Nemesis)
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

    static async updateNemesis(nemesis: Nemesis): Promise<Nemesis> {
        return await fetch(ActorPath.Nemesis + `${nemesis.id}`, {
            method: "PUT",
            body: JSON.stringify(nemesis),
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

    static async updateNemesisSkill(id: string, skill: ActorSkill): Promise<Nemesis> {
        return await fetch(ActorPath.Nemesis + `${id}` + RootPath.Skills, {
            method: "PATCH",
            body: JSON.stringify(skill),
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

    static async updateRivalSkill(id: string, skill: ActorSkill): Promise<Rival> {
        return await fetch(ActorPath.Rival + `${id}` + RootPath.Skills, {
            method: "PATCH",
            body: JSON.stringify(skill),
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

    static async createMinion(id: string, minionName: string): Promise<Minion> {
        return await fetch(CampaignPath.Campaign + `${id}` + ActorPath.Minion + `${minionName}`, {
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

    static async getMinion(id: string): Promise<Minion> {
        return await fetch(ActorPath.Minion + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getMinions(campaignName: string): Promise<Minion[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Minion)
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

    static async updateMinion(minion: Minion): Promise<Minion> {
        return await fetch(ActorPath.Minion + `${minion.id}`, {
            method: "PUT",
            body: JSON.stringify(minion),
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

    static async updateMinionSkill(id: string, skill: GroupSkill): Promise<Minion> {
        return await fetch(ActorPath.Minion + `${id}` + RootPath.Skills, {
            method: "PATCH",
            body: JSON.stringify(skill),
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
}