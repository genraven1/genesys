import Player, {PlayerSkill} from "../../models/actor/player/Player";
import {PlayerPath, CampaignPath, RootPath} from "../RootPath";
import Career from "../../models/actor/player/Career";
import Archetype from "../../models/actor/player/Archetype";
import {Characteristic} from "../../models/actor/Characteristic";

export default class PlayerService {
    static async createPlayer(id: string, playerName: string): Promise<Player> {
        return await fetch(CampaignPath.Campaign + `${id}` + PlayerPath.Player + `${playerName}`, {
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
        return await fetch(PlayerPath.Player + `${id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }
                return res.json()
            })
    }

    static async getPlayers(campaignName: string): Promise<Player[]> {
        return await fetch(CampaignPath.Campaign + `${campaignName}` + PlayerPath.Player)
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
        return await fetch(PlayerPath.Player + `${player.id}`, {
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
        return await fetch(PlayerPath.Creation + `${playerId}` + RootPath.Career, {
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
        return await fetch(PlayerPath.Creation + `${playerId}` + RootPath.Career + 'skills/', {
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
        return await fetch(PlayerPath.Creation + `${playerId}` + RootPath.Archetype, {
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

    static async purchaseCharacteristicUpgrade(playerId: string, characteristic: Characteristic): Promise<Player> {
        return await fetch(PlayerPath.Creation + `${playerId}` + PlayerPath.Characteristic, {
            method: "PATCH",
            body: JSON.stringify(characteristic),
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