import Rival from "../../models/actor/npc/Rival";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";
import {ActorSkill} from "../../models/actor/Actor";

export default class RivalService {
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
}