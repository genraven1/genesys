import Minion, {GroupSkill} from "../../models/actor/npc/Minion";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";

export default class MinionService {
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