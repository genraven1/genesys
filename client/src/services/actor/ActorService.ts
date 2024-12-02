import Player, {PlayerSkill} from "../../models/actor/player/Player";
import Actor from "../../models/actor/Actor";
import NonPlayerActor from "../../models/actor/npc/NonPlayerActor";
import Career from "../../models/actor/player/Career";
import Archetype from "../../models/actor/player/Archetype";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";

export default class ActorService {

    static async getActors(campaignName: string): Promise<Actor[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Actor)
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

    static async getNonPlayerCharacters(campaignName: string): Promise<NonPlayerActor[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + ActorPath.Npc)
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


}