import Nemesis from "../../models/actor/npc/Nemesis";
import {ActorPath, CampaignPath, RootPath} from "../RootPath";
import {ActorSkill} from "../../models/actor/Actor";

export default class NemesisService {
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
}